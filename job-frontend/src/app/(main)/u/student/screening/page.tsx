/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import React, { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import AudioGif from "./_components/audio-gif";
import { Card, CardContent } from "@/components/ui/card";
import useTextToSpeech from "@/hooks/useTextToSpeech";
import { useAxios } from "@/hooks/useAxios";
import { CircleStop, Disc2, Loader, PhoneOff } from "lucide-react";
import { toast } from "sonner";
import { Response, TranscribeReponse } from "@/types";
import { useAppDispatch, useAppSelector } from "@/store";
import {
  clearTranscript,
  updateHistory,
  updateTranscript,
} from "@/store/features/transcriptionSlice";

const ScreeningPage: React.FC = () => {
  const fullscreenRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [stream, setStream] = useState<MediaStream | null>(null);

  const { isSpeaking, speak, cancel } = useTextToSpeech();
  const { mutate, loading } = useAxios();

  const { transcript, history } = useAppSelector((state) => state.transcript);
  const dispatch = useAppDispatch();

  useEffect(() => {
    async function enablestream() {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: {
          echoCancellation: true,
        },
      });

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      }

      setStream(stream);
    }
    enablestream();
  }, []);

  useEffect(() => {
    if (fullscreenRef.current) {
      fullscreenRef.current.requestFullscreen().catch((err) => {
        console.error(
          `Error attempting to enable full-screen mode: ${err.message} (${err.name})`
        );
      });
    }
  }, []);

  //cleanup
  useEffect(() => {
    return () => {
      setStream(null);
      if (videoRef.current) {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        videoRef.current.srcObject = null;
      }
      setIsRecording(false);
      cancel();
      mediaRecorderRef.current = null;
      dispatch(clearTranscript());
    };
  }, []);

  const handleStartRecording = async () => {
    setIsRecording(true);

    const mediaRecorder = new MediaRecorder(stream!);
    mediaRecorderRef.current = mediaRecorder;
    const audioChunks: BlobPart[] = [];

    mediaRecorder.ondataavailable = (event) => {
      audioChunks.push(event.data);
    };

    mediaRecorder.onstop = async () => {
      const audioBlob = new Blob(audioChunks, { type: "audio/wav" });
      const formData = new FormData();
      formData.append("audio", audioBlob, "recording.wav");

      const { error, data } = await mutate<Response<TranscribeReponse>>(
        "post",
        "/transcribe",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (error) {
        console.error("Error during transcription:", error);
      } else if (data) {
        dispatch(updateTranscript(data?.data?.completion));
        dispatch(updateHistory(data?.data?.history));
      }
    };

    mediaRecorder.start();
  };

  const handleStopRecording = () => {
    setIsRecording(false);
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
    }
  };

  const endCall = () => {};

  useEffect(() => {
    if (transcript) {
      speak(transcript);
    }
  }, [speak, transcript]);

  return (
    <div ref={fullscreenRef} className="bg-teal-950 h-screen flex">
      <div className="w-full">
        <div className="flex justify-between items-center text-white my-4 border-b border-b-teal-800 px-4 pb-2">
          <div className="flex flex-col">
            <h1 className="text-2xl font-semibold text-white">JobSeek</h1>
            <p className="text-sm text-gray-400">Screening Page</p>
          </div>
          <div className="flex flex-col">
            <p>Software Engineering Role</p>
            <p className="text-gray-400">Mock Interview</p>
          </div>
        </div>
        <div className="flex items-center justify-center gap-10 mt-8">
          <AudioGif
            className="h-[30ch] rounded-xl shadow"
            speaking={isSpeaking}
          />
          <video
            ref={videoRef}
            width={"350"}
            className={cn(
              "border border-teal-600 rounded-xl shadow h-[30ch] transform scale-x-[-1]",
              !videoRef.current && "bg-teal-500"
            )}
            muted
          />
        </div>
        <div className="w-full flex justify-center items-center gap-4 my-8">
          {isRecording ? (
            <div className="flex flex-col items-center gap-1 text-white text-sm">
              <CircleStop
                color="white"
                role="button"
                size={"2.5rem"}
                className="bg-red-500 rounded-xl p-2"
                onClick={handleStopRecording}
              />
              <p>Stop</p>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-1 text-white text-sm">
              <Disc2
                color="white"
                role="button"
                size={"2.5rem"}
                className="bg-teal-500 rounded-xl p-2"
                onClick={() => {
                  handleStartRecording();
                  toast.info("Your response is being recorded");
                }}
              />
              <p>Record</p>
            </div>
          )}
          <div className="flex flex-col items-center gap-1 text-white text-sm">
            <PhoneOff
              color="white"
              role="button"
              size={"2.5rem"}
              className="bg-red-500 rounded-xl p-2"
              onClick={endCall}
            />
            <p>End Call</p>
          </div>
        </div>
      </div>
      <div className="h-full w-[500px] border border-teal-800 p-3 space-y-3 pb-4 overflow-y-scroll">
        <h2 className="text-2xl font-semibold text-center text-white">
          Transcription
        </h2>
        {history.map((res, i) => (
          <TranscriptionCard key={i} role={res.role} text={res.parts[0].text} />
        ))}
        {loading && (
          <div className="w-full flex justify-center my-3">
            <Loader className="animate-spin" color="white" />
          </div>
        )}
      </div>
    </div>
  );
};

export default ScreeningPage;

const TranscriptionCard = ({ role, text }: { role: string; text: string }) => {
  const { data } = useAppSelector((state) => state.auth);
  return (
    <Card className="rounded-xl bg-teal-800 text-white border border-teal-700">
      <CardContent className="space-y-2 py-2">
        <p className="text-md capitalize">
          {role === "model" ? "JobSeek" : data?.name}
        </p>
        <p className="text-sm">{text}</p>
      </CardContent>
    </Card>
  );
};
