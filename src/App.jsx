// src/App.jsx
import { useState } from "react";
import GeneralInfo from "./components/GeneralInfo";
import Education from "./components/Education";
import Experience from "./components/Experience";
import CVPreview from "./components/CVPreview";
import "./styles/App.css";

export default function App() {
  const [general, setGeneral] = useState({});
  const [education, setEducation] = useState({});
  const [experience, setExperience] = useState({});

  return (
    <div className="app">
      <header>
        <h1>CV Builder</h1>
      </header>

      <main>
        <GeneralInfo onSubmit={setGeneral} />
        <Education onSubmit={setEducation} />
        <Experience onSubmit={setExperience} />
      </main>

      <CVPreview
        general={general}
        education={education}
        experience={experience}
      />
    </div>
  );
}
