import { useEffect, useState } from "react";
import spiderCursor from "../assets/spider-web-transparent.png";
export default function CustomCursor() {
  const [position, setPosition] = useState({
    x: 0,
    y: 0,
  });

  useEffect(() => {
    const moveCursor = (e) => {
      setPosition({
        x: e.clientX,
        y: e.clientY,
      });
    };

    window.addEventListener("mousemove", moveCursor);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
    };
  }, []);

  return (
    <img
      src={spiderCursor}
      className="custom-cursor"
      alt=""
      style={{
        left: position.x,
        top: position.y,
      }}
    />
  );
}