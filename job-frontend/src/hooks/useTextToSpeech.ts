import { useState, useEffect, useCallback } from 'react';

const useTextToSpeech = () => {
  const [isSpeaking, setIsSpeaking] = useState(false);

  const speak = useCallback((text: string) => {
    if (!window.speechSynthesis) {
      console.error('Speech Synthesis API is not supported in this browser.');
      return;
    }

    const utterance = new SpeechSynthesisUtterance(text);
    setIsSpeaking(true);

    utterance.onend = () => {
      setIsSpeaking(false);
    };

    utterance.onerror = (event) => {
      console.error('SpeechSynthesisUtterance.onerror', event);
      setIsSpeaking(false);
    };

    window.speechSynthesis.speak(utterance);
  }, []);

  const cancel = useCallback(() => {
    if (window.speechSynthesis) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  }, []);

  useEffect(() => {
    return () => {
      if (window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  return { isSpeaking, speak, cancel };
};

export default useTextToSpeech;
