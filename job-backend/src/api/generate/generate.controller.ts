import { Request, Response } from "express";
import { Content, GoogleGenerativeAI } from "@google/generative-ai";
import { config } from "../../util/constant";
import fs from "fs";
import { exec } from "child_process";
import path from "path";

let history: Content[] = [];

export const generateText = async (req: Request, res: Response) => {
  const params = req.query as { prompt: string };

  console.log(params.prompt);

  // Access your API key as an environment variable (see "Set up your API key" above)
  const genAI = new GoogleGenerativeAI(config.gemini.api.key);

  const chatModel = genAI.getGenerativeModel({
    model: "gemini-1.5-pro", // Specify Gemini-1.5 Pro model
    systemInstruction: {
      role: "model",
      parts: [
        {
          text: `You are a Interviewer of Samsung Research Institute, India named JobSeek. You are given task to asses candidates for the role of Junior Frontend Developer with skills involving React in a maximum of 10 questions one by one after the user has answered the previous question excluding greetings and final remarks and at last you need to generate a report on how the person did in a detailed format and provide a rating to the candidate according to his experience in each skill.\nYou have to behave like a human, and talk to the person in the interview, you are HR of Samsung R&D India. After 10 Questions make sure to end chat by saying "Thanks for Giving the Interview.". And do not use any special characters while giving the response and keep in mind that the response will be read out by browser speech api. Act as an human and ask one by one and ask counter questions`,
        },
      ],
    },
    generationConfig: {
      maxOutputTokens: 100,
    },
  });

  try {
    const response = await chatModel.startChat({
      history,
    });

    const result = await response.sendMessage(
      params.prompt || "Hi I am sriharsha"
    );

    res.json({
      completion: result.response.text(),
      count: result.response.usageMetadata,
      history,
    }); // Return only the completed text
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Chat completion failed" });
  }
};

export const speechToText = async (req: Request, res: Response) => {
  const audioFilePath = req.file.path;

  // Path to the Python script
  const pythonScriptPath = path.join(__dirname, "../lib/transcribe.py");

  // Execute the Python script
  exec(
    `python3 ${pythonScriptPath} ${audioFilePath}`,
    (error, stdout, stderr) => {
      if (error) {
        console.error(`Error: ${error.message}`);
        return res.status(500).send({ error: error.message });
      }
      if (stderr) {
        console.error(`Stderr: ${stderr}`);
        return res.status(500).send({ error: stderr });
      }

      // Parse and send the transcription result
      const result = JSON.parse(stdout);
      res.send({ transcription: result.text });

      // Clean up: delete the uploaded audio file
      fs.unlink(audioFilePath, (err) => {
        if (err) {
          console.error(`Failed to delete uploaded file: ${err.message}`);
        }
      });
    }
  );
};
