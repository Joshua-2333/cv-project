import { useState, useEffect } from "react";
import GeneralInfo from "./components/GeneralInfo";
import AboutMe from "./components/AboutMe";
import Education from "./components/Education";
import Experience from "./components/Experience";
import CVPreview from "./components/CVPreview";
import "./styles/App.css";

export default function App() {
  // General info (single-entry)
  const [general, setGeneral] = useState({
    name: "",
    email: "",
    phone: "",
  });

  // About Me
  const [about, setAbout] = useState("");

  // Education & Experience (multi-entry lists)
  const [education, setEducation] = useState([]);
  const [experience, setExperience] = useState([]);

  // Template selection
  const [template, setTemplate] = useState("classic");

  // Load from localStorage on first mount
  useEffect(() => {
    const savedData = localStorage.getItem("cvData");
    if (savedData) {
      const parsed = JSON.parse(savedData);
      if (parsed.general) setGeneral(parsed.general);
      if (parsed.about) setAbout(parsed.about);
      if (parsed.education) setEducation(parsed.education);
      if (parsed.experience) setExperience(parsed.experience);
      if (parsed.template) setTemplate(parsed.template);
    }
  }, []);

  // Save to localStorage whenever state changes
  useEffect(() => {
    const data = { general, about, education, experience, template };
    localStorage.setItem("cvData", JSON.stringify(data));
  }, [general, about, education, experience, template]);

  // Handlers to add new items
  const addEducation = (edu) => setEducation((prev) => [...prev, edu]);
  const addExperience = (exp) => setExperience((prev) => [...prev, exp]);

  // Clear all data
  const clearAll = () => {
    setGeneral({ name: "", email: "", phone: "" });
    setAbout("");
    setEducation([]);
    setExperience([]);
    setTemplate("classic");
    localStorage.removeItem("cvData");
  };

  return (
    <div className="app">
      <header>
        <h1>CV Builder</h1>
        <button onClick={clearAll} className="clear-btn">
          Clear All Data
        </button>
      </header>

      <main className="form-sections">
        {/* General Info */}
        <GeneralInfo onSubmit={setGeneral} />

        {/* About Me */}
        <AboutMe about={about} setAbout={setAbout} />

        {/* Template selector */}
        <div className="form-section">
          <h2>Choose Template</h2>
          <select
            value={template}
            onChange={(e) => setTemplate(e.target.value)}
          >
            <option value="classic">Classic</option>
            <option value="modern">Modern</option>
            <option value="minimal">Minimal</option>
          </select>
        </div>

        {/* Education */}
        <Education onSubmit={addEducation} />

        {/* Experience */}
        <Experience onSubmit={addExperience} />
      </main>

      {/* CV preview */}
      <aside className="preview-section">
        <CVPreview
          generalInfo={general}
          about={about}
          educationList={education}
          experienceList={experience}
          template={template}
        />
      </aside>
    </div>
  );
}
