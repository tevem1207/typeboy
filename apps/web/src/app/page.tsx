const text = "대충 흑백 사진에 글 쓰면 명언 같다.";

export default function Page(): JSX.Element {
  return (
    <main className="flex items-center h-dvh justify-center">
      <div className="max-w-[1280px] w-full h-96 border-y-slate-900 border-y mb-20 flex items-center">
        <div className="px-10">
          <div className="text-3xl">{text}</div>
          <input
            className="text-3xl w-full bg-transparent"
            placeholder={text}
          />
        </div>
      </div>
    </main>
  );
}
