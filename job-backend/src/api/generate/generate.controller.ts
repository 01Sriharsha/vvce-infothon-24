import { Request, Response } from "express";
import { exec } from "child_process";
import path from "path";
import fs from "fs";
import { GoogleGenerativeAI, Content } from "@google/generative-ai";
import { config } from "../../util/constant";

let history: Content[] = [];

export const speechToText = async (req: Request, res: Response) => {
  if (!req.file) {
    return res.status(400).send({ error: "No file uploaded" });
  }

  const audioFilePath = req.file.path;

  console.log("audioFilePath", audioFilePath);

  const command = `python C:/Users/HARSHA/Desktop/vvce/job-backend/src/lib/transcribe.py C:/Users/HARSHA/Desktop/vvce/job-backend/${req.file.path}`;

  exec(command, async (error, stdout, stderr) => {
    if (error) {
      console.error(`Error: ${error.message}`);
      return res.status(500).send({ error: error.message });
    }
    if (stderr) {
      console.error(`Stderr: ${stderr}`);
      return res.status(500).send({ error: stderr });
    }

    console.log(stdout);

    const jsonMatch = stdout.match(/\{.*\}/);
    if (!jsonMatch) {
      throw new Error("Failed to parse JSON from script output");
    }

    const result = JSON.parse(jsonMatch[0]);
    const transcription = result.text;

    // Access your API key as an environment variable
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

      const result = await response.sendMessage(transcription);

      res.json({
        data: {
          transcription,
          completion: result.response.text(),
          count: result.response.usageMetadata,
          history,
        },
      }); // Return the transcription and the completed text
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Chat completion failed" });
    }

    // Clean up: delete the uploaded audio file
    fs.unlink(audioFilePath, (err) => {
      if (err) {
        console.error(`Failed to delete uploaded file: ${err.message}`);
      }
    });
  });
};
