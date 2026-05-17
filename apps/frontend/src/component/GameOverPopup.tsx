import win from "../assets/win.png";
import lose from "../assets/lose.png";
import { UpDownAnimation } from "./UpAndDown";

type Props = {
  result: "win" | "lose";
};

export function GameOverPopup({ result }: Props) {
  const src = result === "win" ? win : lose;

  return (
    <div className="fixed inset-0 z-30 flex flex-col items-center justify-center bg-black/80">
      <UpDownAnimation content={<img src={src} alt={result} className="max-w-[60vw] max-h-[60vh]" />} />

      <p className="mt-10 text-white text-2xl">press enter to continue</p>
    </div>
  );
}
