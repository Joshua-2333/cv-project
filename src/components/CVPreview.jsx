import { useRef } from "react";
import html2pdf from "html2pdf.js";
import "../styles/CVPreview.css";

export default function CVPreview({
  generalInfo = {},
  about = "",
  educationList = [],
  experienceList = [],
  skills = [],
  template = "classic",
}) {
  const cvRef = useRef();

  function handleExportPDF() {
    if (!cvRef.current) return;

    const options = {
      margin: 0.5,
      filename: "my-cv.pdf",
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2, useCORS: true },
      jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
    };

    html2pdf().set(options).from(cvRef.current).save();
  }

  return (
    <div className="cv-preview-wrapper">
      <div className={`cv-preview template-${template}`} ref={cvRef}>
        {/* Header */}
        <header className="cv-header">
          <div className="cv-header-name">
            <h1>{generalInfo.name || "Your Name"}</h1>
            <p>
              {generalInfo.email || "email@example.com"} | {generalInfo.phone || "123-456-7890"}
            </p>
          </div>
        </header>

        {/* About Me */}
        {about.trim() && (
          <section className="about">
            <h2>About Me</h2>
            <p>{about}</p>
          </section>
        )}

        {/* Education */}
        <section className="preview-section">
          <h2>Education</h2>
          {educationList.length > 0 ? (
            <ul className="education-list">
              {educationList.map((edu, i) => (
                <li key={i} className="education-item">
                  {edu.school && <p><strong>School:</strong> {edu.school}</p>}
                  {edu.study && <p><strong>Study:</strong> {edu.study}</p>}
                  {edu.date && <p><strong>Date:</strong> {edu.date}</p>}
                </li>
              ))}
            </ul>
          ) : (
            <p className="placeholder">No education added yet.</p>
          )}
        </section>

        {/* Experience */}
        <section className="preview-section">
          <h2>Experience</h2>
          {experienceList.length > 0 ? (
            <ul className="experience-list">
              {experienceList.map((exp, i) => (
                <li key={i} className="experience-item">
                  {exp.company && <p><strong>Company:</strong> {exp.company}</p>}
                  {exp.position && <p><strong>Position:</strong> {exp.position}</p>}
                  {exp.responsibilities && <p><strong>Responsibilities:</strong> {exp.responsibilities}</p>}
                  {(exp.fromDate || exp.untilDate) && (
                    <p><strong>Duration:</strong> {exp.fromDate || "Start"} – {exp.untilDate || "Present"}</p>
                  )}
                </li>
              ))}
            </ul>
          ) : (
            <p className="placeholder">No experience added yet.</p>
          )}
        </section>

        {/* Skills */}
        {skills.length > 0 && (
          <section className="preview-section">
            <h2>Skills</h2>
            <ul className="skills-preview">
              {skills.map((skill, i) => (
                <li key={i} className="skill-chip">{skill}</li>
              ))}
            </ul>
          </section>
        )}
      </div>

      <button className="export-btn" onClick={handleExportPDF}>
        Export as PDF
      </button>
    </div>
  );
}
