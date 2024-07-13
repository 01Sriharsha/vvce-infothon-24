"use client";

import axios from "@/lib/axios";
import { SYSTEM_CHECK } from "@/util/constant";
import React, {
  createContext,
  useCallback,
  useContext,
  useRef,
  useState,
} from "react";
import { useSocket } from "@/providers/socket-provider";

type MediaType = keyof typeof SYSTEM_CHECK;

type MediaContext = {
  videoStream: MediaStream | null;
  screenStream: MediaStream | null;
  success: string;
  error: string;
  isRecording: boolean;
  mediaBlobUrl: string;
  audioBlob: Blob | null;
  transcript: string;
  loading: boolean;
  enableMedia: (mediaType: MediaType) => Promise<MediaStream | undefined>;
  clearAllStreams: () => void;
  startRecording: () => void;
  stopRecording: () => void;
  toggleTranscriptLoading: () => void;
};

const MediaContext = createContext({} as MediaContext);

export const useMedia = () => useContext(MediaContext);

const MediaProvider = ({ children }: { children: React.ReactNode }) => {
  const { emit } = useSocket();
  //streams
  const [videoStream, setVideoStream] = useState<MediaStream | null>(null);
  const [screenStream, setScreenStream] = useState<MediaStream | null>(null);

  //status
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  //record
  const [isRecording, setIsRecording] = useState(false);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const [mediaBlobUrl, setMediaBlobUrl] = useState("");
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);

  //transcript
  const [transcript, setTranscript] = useState("");
  const [loading, setLoading] = useState(false);

  const enableMedia = useCallback(async (mediaType: MediaType) => {
    try {
      let media: MediaStream | null = null;
      switch (mediaType) {
        case SYSTEM_CHECK.CAMERA:
          media = await navigator.mediaDevices.getUserMedia({
            video: true,
            audio: false,
          });
          setVideoStream(media);
          setSuccess("Your camera connected successfully");
          break;

        case SYSTEM_CHECK.AUDIO:
          media = await navigator.mediaDevices.getUserMedia({
            video: true,
            audio: {
              echoCancellation: true,
              autoGainControl: true,
              noiseSuppression: true,
            },
          });
          setVideoStream(media);
          setSuccess("Your microphone connected successfully");
          break;

        case SYSTEM_CHECK.SCREEN:
          media = await navigator.mediaDevices.getDisplayMedia({
            video: true,
            audio: true,
          });
          media.getTracks()[0].addEventListener("ended", () => {
            setError("Screen Sharing stopped");
            setScreenStream(null);
          });
          setScreenStream(media);
          setSuccess("Your screen connected successfully");
          break;
      }
      if (!media) return;
      setError("");
      return media;
    } catch (error: any) {
      setError(error?.message || "Failed to access camera");
    }
  }, []);

  const disableMedia = useCallback(
    (stream: MediaStream, streamType: keyof typeof SYSTEM_CHECK) => {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
        if (streamType === SYSTEM_CHECK.CAMERA) setVideoStream(null);
        if (streamType === SYSTEM_CHECK.AUDIO) setVideoStream(null);
        if (streamType === SYSTEM_CHECK.SCREEN) setScreenStream(null);
      }
    },
    []
  );

  const clearAllStreams = () => {
    if (videoStream) {
      videoStream.getTracks().forEach((track) => track.stop());
    }
    if (screenStream) {
      screenStream.getTracks().forEach((track) => track.stop());
    }
  };

  const startRecording = useCallback(() => {
    if (videoStream && !mediaRecorderRef.current) {
      setAudioBlob(null);
      setMediaBlobUrl("");
      const audioTrack = videoStream.getAudioTracks();
      const audioStream = new MediaStream(audioTrack);
      const recorder = new MediaRecorder(videoStream);
      mediaRecorderRef.current = recorder;
      recorder.start();
      setIsRecording(true);
    }
  }, [videoStream]);

  const stopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      //get the recorded data after stopping
      mediaRecorderRef.current.ondataavailable = async (event) => {
        if (event.data.size > 0) {
          const blob = new Blob([event.data], { type: "audio/wav" });
          const url = URL.createObjectURL(blob);
          console.log(blob);
          setAudioBlob(blob);
          setMediaBlobUrl(url);
          //send audio to server
          await sendSpeechToServer(blob);
        }
      };
      mediaRecorderRef.current = null;
    }
  };

  const toggleTranscriptLoading = () => setLoading(!loading);

  const sendSpeechToServer = async (audioBlob: Blob) => {
    if (!audioBlob) return;

    const formData = new FormData();
    formData.append("file", audioBlob, "audio.wav");
    toggleTranscriptLoading();
    try {
      const username = "sriharsha";
      const response = await axios.post(
        `http://localhost:5000/speech-recognition/${username}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      const transcriptedSpeech = response.data.transcription.text;
      setTranscript(transcriptedSpeech || "");
      emit("chat", { message: transcriptedSpeech });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <MediaContext.Provider
      value={{
        videoStream,
        screenStream,
        error,
        success,
        isRecording,
        audioBlob,
        mediaBlobUrl,
        transcript,
        loading,
        startRecording,
        stopRecording,
        enableMedia,
        clearAllStreams,
        toggleTranscriptLoading,
      }}
    >
      {children}
    </MediaContext.Provider>
  );
};

export default MediaProvider;
