import { useEffect, useState } from "react";

export function SlideContent({ contents } : { contents : React.ReactNode[] }) {
  const [index, setIndex] = useState(0);
  const [animating, setAnimating] = useState(false);

  useEffect(() => {
    const onWheel = (e: WheelEvent) => {
      if (animating) return;
      if (Math.abs(e.deltaY) < 20) return;

      setAnimating(true);

      setTimeout(() => {
        setIndex((prev) =>
          e.deltaY > 0
            ? (prev + 1) % contents.length
            : (prev - 1 + contents.length) % contents.length
        );
        setAnimating(false);
      }, 400);
    };

    window.addEventListener("wheel", onWheel, { passive: true });
    return () => window.removeEventListener("wheel", onWheel);
  }, [animating]);

  return (
    <div
      className={`
        w-full text-center
        transition-all duration-400 ease-out
        ${animating ? "opacity-0 -translate-y-10" : "opacity-100 translate-y-0"}
      `}
    >
      {contents[index]}
    </div>
  );
}