"use client";

import clsx from "clsx";
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
      className="max-w-[1280px] w-full h-96 border-y-slate-900 border-y-2 mb-20 flex items-center relative"
      action=""
    >
      <div className="px-10 flex flex-wrap text-3xl">
        {text.split("").map((char, index) => {
          return (
            <div className="flex flex-col mb-4" key={`type-letter-${index}`}>
              <EditorText className="cursor-default">{char}</EditorText>
              {inputValue[index] ? (
                <EditorText
                  isCursor={index === inputValue.length - 1}
                  className="data-[cursor=true]:border-r"
                >
                  {inputValue[index]}
                </EditorText>
              ) : (
                <EditorText className="text-gray-300">{char}</EditorText>
              )}
            </div>
          );
        })}
        <input
          name="type"
          className="opacity-0 absolute"
          autoFocus
          autoComplete="off"
          onFocus={handleInputFocus}
          onKeyDown={handleKeyDown}
          ref={inputRef}
          value={inputValue}
          onChange={({ target: { value } }) => setInputValue(value)}
        />
      </div>

      <div className="absolute bottom-2 right-4 flex gap-3 items-center">
        <div className="flex gap-4">
          <div>SPEED</div>
          <div>{`${0 ?? 0} CPM`}</div>
        </div>
        <div className="h-5 border-r border-gray-900"></div>
        <div className="flex gap-4">
          <div>ACC</div>
          <div>{`${0 ?? 0} %`}</div>
        </div>
      </div>
    </form>
  );
};

const EditorText = ({
  children,
  className,
  isCursor,
  ...props
}: ComponentPropsWithoutRef<"p"> & { isCursor?: boolean }) => {
  return (
    <div className="flex">
      {children === " " ? (
        <p
          className={clsx("tracking-tight", !isCursor && "mr-[2px]", className)}
          {...props}
        >
          &nbsp;
        </p>
      ) : (
        <p
          className={clsx("tracking-tight", !isCursor && "mr-[2px]", className)}
          {...props}
        >
          {children}
        </p>
      )}
      {isCursor && <span className="border animate-cursor border-gray-900" />}
    </div>
  );
};
