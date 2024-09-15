"use client";

import {
  ComponentPropsWithoutRef,
  FocusEventHandler,
  KeyboardEventHandler,
  useRef,
  useState,
} from "react";

const text =
  "대충 흑백 사진에 글 쓰면 명언 같다. 대충 흑백 사진에 글 쓰면 명언 같다. 대충 흑백 사진에 글 쓰면 명언 같다.";

export const Editor = () => {
  const [inputValue, setInputValue] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const formFocusHandler = () => {
    inputRef.current?.focus();
  };

  const handleInputFocus: FocusEventHandler<HTMLInputElement> = (event) => {
    const input = event.target;
    const length = input.value.length;

    input.setSelectionRange(length, length);
  };

  const handleKeyDown: KeyboardEventHandler<HTMLInputElement> = (event) => {
    if ((event.ctrlKey || event.metaKey) && event.key === "a") {
      event.preventDefault();
    }
  };

  return (
    <form
      onClick={formFocusHandler}
      className="max-w-[1280px] w-full h-96 border-y-slate-900 border-y mb-20 flex items-center"
      action=""
    >
      <div className="px-10 flex flex-wrap text-3xl">
        {text.split("").map((char, index) => {
          return (
            <div className="flex flex-col mb-4" key={`type-letter-${index}`}>
              <EditorText>{char}</EditorText>
              {inputValue[index] ? (
                <EditorText>{inputValue[index]}</EditorText>
              ) : (
                <EditorText className="text-gray-300">{char}</EditorText>
              )}
            </div>
          );
        })}
        <input
          name="type"
          className="opacity-0"
          autoFocus
          onFocus={handleInputFocus}
          onKeyDown={handleKeyDown}
          ref={inputRef}
          value={inputValue}
          onChange={({ target: { value } }) => setInputValue(value)}
        />
      </div>
    </form>
  );
};

const EditorText = ({ children, ...props }: ComponentPropsWithoutRef<"p">) => {
  return children === " " ? (
    <p {...props}>&nbsp;</p>
  ) : (
    <p {...props}>{children}</p>
  );
};
