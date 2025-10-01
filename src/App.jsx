import { useState } from "react";
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

  // Education & Experience (multi-entry)
  const [education, setEducation] = useState([]); 
  const [experience, setExperience] = useState([]);

  return (
    <div className="app">
      <header>
        <h1>CV Builder</h1>
      </header>

      <main className="form-sections">
        {/* Pass setters to children to lift state up */}
        <GeneralInfo onSubmit={setGeneral} />
        <Education onSubmit={setEducation} />
        <Experience onSubmit={setExperience} />
      </main>

      {/* CV preview receives the full state */}
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
