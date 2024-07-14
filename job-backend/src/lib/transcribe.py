import whisper
import sys
import os
import json


def transcribe_audio(audio_file_path):
    # Load the model
    model = whisper.load_model("base")

    # Transcribe the audio file
    result = model.transcribe(audio_file_path, language="en", fp16=False, verbose=True)

    # Print the result in JSON format
    print(json.dumps({"text": result["text"]}, ensure_ascii=False))


if __name__ == "__main__":
    if len(sys.argv) != 2:
        print("Usage: python transcribe.py <audio_file_path>")
        sys.exit(1)

    audio_file_path = sys.argv[1]

    if not os.path.exists(audio_file_path):
        print(f"Error: File '{audio_file_path}' does not exist.")
        sys.exit(1) 

    transcribe_audio(audio_file_path)
