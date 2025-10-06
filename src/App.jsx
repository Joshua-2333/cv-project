// App.jsx
import { useState, useEffect } from "react";
import GeneralInfo from "./components/GeneralInfo";
import AboutMe from "./components/AboutMe";
import Education from "./components/Education";
import Experience from "./components/Experience";
import Skills from "./components/Skills";
import CVPreview from "./components/CVPreview";
import "./styles/App.css";

// Import html2pdf.js
import html2pdf from "html2pdf.js";

export default function App() {
  const [general, setGeneral] = useState({ name: "", email: "", phone: "" });
  const [about, setAbout] = useState("");
  const [education, setEducation] = useState([]);
  const [experience, setExperience] = useState([]);
  const [skills, setSkills] = useState([]);
  const [template, setTemplate] = useState("classic");

  // Load from localStorage
  useEffect(() => {
    const savedData = localStorage.getItem("cvData");
    if (savedData) {
      const parsed = JSON.parse(savedData);
      if (parsed.general) setGeneral(parsed.general);
      if (parsed.about) setAbout(parsed.about);
      if (parsed.education) setEducation(parsed.education);
      if (parsed.experience) setExperience(parsed.experience);
      if (parsed.skills) setSkills(parsed.skills);
      if (parsed.template) setTemplate(parsed.template);
    }
  }, []);

  // Save to localStorage
  useEffect(() => {
    const data = { general, about, education, experience, skills, template };
    localStorage.setItem("cvData", JSON.stringify(data));
  }, [general, about, education, experience, skills, template]);

  const clearAll = () => {
    setGeneral({ name: "", email: "", phone: "" });
    setAbout("");
    setEducation([]);
    setExperience([]);
    setSkills([]);
    setTemplate("classic");
    localStorage.removeItem("cvData");
  };

  // Export CV as PDF
  const handleExportPDF = () => {
    const element = document.querySelector(".cv-preview");
    if (!element) return;

    const opt = {
      margin: 0,
      filename: "my_cv.pdf",
      image: { type: "jpeg", quality: 1 },
      html2canvas: { scale: 2, useCORS: true },
      jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
    };

    html2pdf().set(opt).from(element).save();
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>CV Builder</h1>
        <button onClick={clearAll} className="clear-btn">
          Clear All Data
        </button>
      </header>

      <div className="app-body">
        <main className="form-sections">
          <GeneralInfo generalInfo={general} setGeneralInfo={setGeneral} />
          <AboutMe about={about} setAbout={setAbout} />

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

          <Education educationList={education} setEducation={setEducation} />
          <Experience
            experienceList={experience}
            setExperience={setExperience}
          />
          <Skills skills={skills} onChange={setSkills} />
        </main>

        <aside className="preview-section">
          <div className="preview-scroll-container">
            <CVPreview
              generalInfo={general}
              about={about}
              educationList={education}
              experienceList={experience}
              skills={skills}
              template={template}
            />
          </div>
          <div className="export-bar">
            <button className="export-btn" onClick={handleExportPDF}>
              Export as PDF
            </button>
          </div>
        </aside>
      </div>
    </div>
  );
}
