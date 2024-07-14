import { TranscribeReponse } from "@/types";
import { createSlice } from "@reduxjs/toolkit";

type TranscriptState = {
  transcript: string;
  history: TranscribeReponse["history"];
  completion: string;
};

const initialState: TranscriptState = {
  transcript: "",
  history: [],
  completion: "",
};

const transcriptSlice = createSlice({
  name: "transcript",
  initialState,
  reducers: {
    updateTranscript: (state, action) => {
      state.transcript = action.payload;
    },
    updateHistory: (state, action) => {
      state.history = action.payload;
    },
    clearTranscript: (state) => {
      state.transcript = "";
      state.history = [];
    },
  },
});

export const { updateTranscript, updateHistory, clearTranscript } =
  transcriptSlice.actions;

export const transcriptReducer = transcriptSlice.reducer;
