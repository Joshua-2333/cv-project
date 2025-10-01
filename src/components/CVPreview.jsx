// src/components/CVPreview.jsx
import { useRef } from "react";
import html2pdf from "html2pdf.js";
import "../styles/CVPreview.css";

export default function CVPreview({
  generalInfo,
  about,
  educationList,
  experienceList,
  template,
}) {
  const cvRef = useRef();

  // Export CV as PDF (fit to one page)
  function handleExportPDF() {
    if (!cvRef.current) return;

    const element = cvRef.current;
    const options = {
      margin: 0.5,
      filename: "my-cv.pdf",
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2, useCORS: true, scrollY: -window.scrollY },
      jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
    };
    html2pdf().set(options).from(element).save();
  }

  return (
    <div className="cv-preview-wrapper">
      <div className={`cv-preview template-${template}`} ref={cvRef}>
        {/* Header */}
        <header className="cv-header">
          <div className="cv-header-name">
            <h1>{generalInfo.name || "Your Name"}</h1>
            <p>
              {generalInfo.email || "email@example.com"} |{" "}
              {generalInfo.phone || "123-456-7890"}
            </p>
          </div>
        </header>

        {/* About Me */}
        {about && (
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
                  <p>
                    <strong>School:</strong> {edu.school || "N/A"}
                  </p>
                  <p>
                    <strong>Study:</strong> {edu.study || "N/A"}
                  </p>
                  <p>
                    <strong>Date:</strong> {edu.date || "N/A"}
                  </p>
                </li>
              ))}
            </ul>
          ) : (
            <p>No education added yet.</p>
          )}
        </section>

        {/* Experience */}
        <section className="preview-section">
          <h2>Experience</h2>
          {experienceList.length > 0 ? (
            <ul className="experience-list">
              {experienceList.map((exp, i) => (
                <li key={i} className="experience-item">
                  <p>
                    <strong>Company:</strong> {exp.company || "N/A"}
                  </p>
                  <p>
                    <strong>Position:</strong> {exp.position || "N/A"}
                  </p>
                  <p>
                    <strong>Responsibilities:</strong>{" "}
                    {exp.responsibilities || "N/A"}
                  </p>
                  <p>
                    <strong>From:</strong> {exp.fromDate || "N/A"}
                  </p>
                  <p>
                    <strong>Until:</strong> {exp.untilDate || "N/A"}
                  </p>
                </li>
              ))}
            </ul>
          ) : (
            <p>No experience added yet.</p>
          )}
        </section>
      </div>

      {/* Export PDF button */}
      <button className="export-btn" onClick={handleExportPDF}>
        Export as PDF
      </button>
    </div>
  );
}
