import { useState, useEffect, useRef } from "react";

export function useTypewriter(text: string, speed = 30): string {
  const [displayed, setDisplayed] = useState(text);
  const indexRef = useRef(0);
  const wordsRef = useRef<string[]>([]);

  useEffect(() => {
    if (text.length === 0) {
      indexRef.current = 0;
      wordsRef.current = [];
      setDisplayed("");
      return;
    }

    const words = text.split(/(\s+)/);
    wordsRef.current = words;

    if (indexRef.current >= words.length) {
      setDisplayed(text);
      return;
    }

    const interval = setInterval(() => {
      indexRef.current += 1;
      if (indexRef.current <= wordsRef.current.length) {
        setDisplayed(wordsRef.current.slice(0, indexRef.current).join(""));
      }
      if (indexRef.current >= wordsRef.current.length) {
        clearInterval(interval);
      }
    }, speed);

    return () => clearInterval(interval);
  }, [text, speed]);

  return displayed;
}
