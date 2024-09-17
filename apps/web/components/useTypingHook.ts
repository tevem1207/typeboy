import { ChangeEventHandler, useState } from "react";

export const useTypingHook = (text: string) => {
  const [inputText, setInputText] = useState("");
  const [startTime, setStartTime] = useState<Date>();
  const [elapsedTime, setElapsedTime] = useState<number>();
  const [cpm, setCpm] = useState(0);
  const [accuracy, setAccuracy] = useState(100);

  const handleInputChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const text = e.target.value;
    setInputText(text);
    if (!startTime) {
      setStartTime(new Date());
    }
    if (startTime) {
      const now = new Date();
      const diff = now.getTime() - startTime.getTime();
      setElapsedTime(diff);
      calculateCpm(text.length, diff);
    }
    calculateAccuracy(text);
  };

  const calculateCpm = (charCount: number, time: number) => {
    console.log(charCount, time);
    const minutes = time / 60000;
    const calculatedCpm = Math.round(charCount / minutes);
    setCpm(calculatedCpm);
  };

  const calculateAccuracy = (input: string) => {
    const correctLength = input
      .slice(0, -1)
      .split("")
      .filter((char, index) => char === text[index]).length;
    const calculatedAccuracy =
      (correctLength / input.slice(0, -1).length) * 100;
    setAccuracy(Math.round(calculatedAccuracy));
  };

  const handleReset = () => {
    setInputText("");
    setStartTime(new Date());
    setElapsedTime(0);
    setCpm(0);
    setAccuracy(100);
  };

  return {
    inputText,
    startTime,
    elapsedTime,
    cpm,
    accuracy,
    handleInputChange,
    handleReset,
  };
};
