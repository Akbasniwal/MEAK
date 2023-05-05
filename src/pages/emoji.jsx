import React, { useMemo, useState } from "react";

export default function Emoji({ message, setMessage, setSticker }) {
  const [emojis,setEmojis] = useState(() => {
    let x=[];
    for (let i = 128512; i <= 128580; i++) {
      x.push(String.fromCodePoint(i));
    }
    return x;
  }, []);

  // on pressing esc key setsticker to 0
  

  return (
    <div>
      <div className="ems">
        {emojis.map((emoji) => {
          return (
            <div
              style={{
                cursor: "pointer",
              }}
              key={emoji}
              onClick={() => {
                setMessage(message + emoji);
                setSticker(0);
              }}
            >
              {emoji}
            </div>
          );
        })}
      </div>
    </div>
  );
}
