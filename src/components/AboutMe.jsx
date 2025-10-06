// AboutMe.jsx
export default function AboutMe({ about, setAbout }) {
  return (
    <div className="form-section">
      <h2>About Me</h2>
      <textarea
        value={about || ""}
        onChange={(e) => setAbout(e.target.value)}
        placeholder="Write a short summary about yourself..."
        rows="4"
      />
    </div>
  );
}
