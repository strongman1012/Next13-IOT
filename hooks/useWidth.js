import { useState, useEffect } from "react";

export default function useWidth() {
  const hasWindow = typeof window !== "undefined";
  const [width, setWidth] = useState(1920);
  //const [width, setWidth] = useState(window.innerWidth);

  // breakpoints
  const [breakpoints, setBreakpoints] = useState({
    sm: "640",
    md: "768",
    lg: "1024",
    xl: "1280",
  });

  useEffect(() => {
    const handleResize = () => {
      setWidth(window?.innerWidth);
    };

    if (window !== undefined) {
      setWidth(window?.innerWidth);
      window?.addEventListener("resize", handleResize);
      return () => {
        window?.removeEventListener("resize", handleResize);
      };
    }
  }, []);

  return { width, breakpoints };
}
