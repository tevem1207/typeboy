import { ChangeEventHandler, useEffect, useMemo, useState } from "react";
import { disassemble } from "es-hangul";

export const useTypingHook = (text: string) => {
  const [inputText, setInputText] = useState("");
  const [elapsedTime, setElapsedTime] = useState(0);

  const cpm =
    elapsedTime > 1000
      ? disassemble(inputText).length / (elapsedTime / 60000)
      : 0;

  const accuracy = useMemo(
    () =>
      (inputText
        .slice(0, -1)
        .split("")
        .filter((char, index) => {
          return char === text[index];
        }).length /
        inputText.slice(0, -1).length) *
      100,
    [inputText],
  );
  const handleInputChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const text = e.target.value;
    setInputText(text);
    if (!elapsedTime) {
      setElapsedTime(1);
    }
  };

  const handleReset = () => {
    setInputText("");
    setElapsedTime(0);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setElapsedTime((prev) => (prev ? prev + 1000 : prev));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return {
    inputText,
    elapsedTime,
    handleInputChange,
    handleReset,
    cpm,
    accuracy,
  };
};
