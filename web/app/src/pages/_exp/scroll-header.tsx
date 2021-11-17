import { useEffect, useRef, useState } from "react";

export default function ScrollHeader() {
  const [ isCollapsed, setIsCollapsed ] = useState(false);
  const prevY = useRef<number>(0);

  useEffect(() => {
    const listener = (e: Event) => {
      const currentY = window.pageYOffset;
      setIsCollapsed(prevY.current < currentY);
      prevY.current = currentY;
      console.log("scroll-header", window.pageYOffset);
    }
    // document.body.onscroll = listener;
    window.addEventListener("scroll", listener);
    return () => window.removeEventListener("scroll", listener);
  });

  const hide = { transform: "translateY(-200px)" };
  const show = { transform: "translateY(0px)" };

  return <>
    <div
      style={{
        width: "100%",
        height: "100px",
        backgroundColor: "black",
        color: "white",
        position: "fixed",
        transition: "transform 500ms"
      }}
      css={ isCollapsed ? hide : show }
    >
      HEADER
    </div>
    <div style={{ width: "100%", height: "2000px" }} >
    </div>
  </>
}