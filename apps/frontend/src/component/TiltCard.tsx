import { useEffect, useRef } from "react";

export function TiltCard({ src, width, strength = 20 }: { src: string, width: number, strength: number }) {
  const cardRef = useRef<HTMLDivElement>(null);

    useEffect(()=>{
        function onMouseMove(e: MouseEvent) {
            const el = cardRef.current;
            if (!el) return;

            const rect = el.getBoundingClientRect();
            const cx = rect.left + rect.width / 2;
            const cy = rect.top + rect.height / 2;

            const dx = e.clientX - cx;
            const dy = e.clientY - cy;

            const rotateY = dx / strength;
            const rotateX = -dy / strength;

            el.style.transform = `
                rotateX(${rotateX}deg)
                rotateY(${rotateY}deg)
            `;
        }

        window.addEventListener("mousemove", onMouseMove);
        return () => window.removeEventListener("mousemove", onMouseMove);
    }, [strength])

  return (
    <div className="perspective-distant">
      <div
        ref={cardRef}
        style={{width: `${width}px`}}
        className={`h-auto transform-gpu duration-100 ease-out rounded-2xl`}
      >
        <img src={src} className="w-full h-full rounded-2xl object-cover"/>
      </div>
    </div>
  );
}
/**
 * 
.tilt-wrapper {
  perspective: 1000px;
}

.tilt-card {
  width: 300px;
  height: 400px;
  transition: transform 0.1s ease-out;
  transform-style: preserve-3d;
  border-radius: 16px;
}

.tilt-card img {
  width: 100%;
  height: 100%;
  border-radius: 16px;
  object-fit: cover;
}

 */