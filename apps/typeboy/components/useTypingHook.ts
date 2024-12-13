import { ChangeEventHandler, useState } from "react";
import { disassemble } from "es-hangul";

export const useTypingHook = (text: string) => {
  const [inputText, setInputText] = useState("");
  const [startTime, setStartTime] = useState<Date>();

  const elapsedTime = startTime
    ? new Date().getTime() - startTime.getTime()
    : 0;

  const cpm =
    Math.round(disassemble(inputText).length / (elapsedTime / 60000)) ?? 0;

  const accuracy =
    (inputText
      .slice(0, -1)
      .split("")
      .filter((char, index) => char === text[index]).length /
      inputText.slice(0, -1).length) *
    100;

  const handleInputChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const text = e.target.value;
    setInputText(text);
    if (!startTime) {
      setStartTime(new Date());
    }
  };

  const handleReset = () => {
    setInputText("");
    setStartTime(new Date());
  };

  return {
    inputText,
    startTime,
    elapsedTime,
    handleInputChange,
    handleReset,
    cpm,
    accuracy,
  };
};
