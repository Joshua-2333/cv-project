// src/App.jsx
import { useState, useEffect } from "react";
import GeneralInfo from "./components/GeneralInfo";
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

  // Education & Experience (multi-entry lists)
  const [education, setEducation] = useState([]);
  const [experience, setExperience] = useState([]);

  // Load from localStorage on first mount
  useEffect(() => {
    const savedData = localStorage.getItem("cvData");
    if (savedData) {
      const parsed = JSON.parse(savedData);
      if (parsed.general) setGeneral(parsed.general);
      if (parsed.education) setEducation(parsed.education);
      if (parsed.experience) setExperience(parsed.experience);
    }
  }, []);

  // Save to localStorage whenever state changes
  useEffect(() => {
    const data = { general, education, experience };
    localStorage.setItem("cvData", JSON.stringify(data));
  }, [general, education, experience]);

  // Handlers to add new items
  const addEducation = (edu) => {
    setEducation((prev) => [...prev, edu]);
  };

  const addExperience = (exp) => {
    setExperience((prev) => [...prev, exp]);
  };

  // Optional: Clear all data & localStorage
  const clearAll = () => {
    setGeneral({ name: "", email: "", phone: "" });
    setEducation([]);
    setExperience([]);
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
        {/* General Info (single-entry) */}
        <GeneralInfo onSubmit={setGeneral} />

        {/* Education (multi-entry) */}
        <Education onSubmit={addEducation} />

        {/* Experience (multi-entry) */}
        <Experience onSubmit={addExperience} />
      </main>

      {/* CV preview */}
      <aside className="preview-section">
        <CVPreview
          generalInfo={general}
          educationList={education}
          experienceList={experience}
        />
      </aside>
    </div>
  );
}
