"use client";
import { useState } from "react";

const text = "대충 흑백 사진에 글 쓰면 명언 같다.";

export default function Page(): JSX.Element {
  const [inputValue, setInputValue] = useState("");
  return (
    <main className="flex items-center h-dvh justify-center">
      <div className="max-w-[1280px] w-full h-96 border-y-slate-900 border-y mb-20 flex items-center">
        <div className="px-10">
          <div className="text-3xl">{text}</div>
          <div className="text-3xl">{inputValue}</div>
        </div>
        <form action="">
          <input
            className="opacity-0"
            autoFocus
            value={inputValue}
            onChange={({ target: { value } }) => setInputValue(value)}
          />
        </form>
      </div>
    </main>
  );
}
