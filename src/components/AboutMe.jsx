import { useState, useEffect } from "react";

export default function AboutMe({ about, setAbout }) {
  const [text, setText] = useState(about || "");

  useEffect(() => {
    setAbout(text);
  }, [text, setAbout]);

  return (
    <div className="form-section">
      <h2>About Me</h2>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Write a short summary about yourself..."
        rows="4"
      />
    </div>
  );
}
