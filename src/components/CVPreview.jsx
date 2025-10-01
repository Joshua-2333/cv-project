import { useRef } from "react";
import html2pdf from "html2pdf.js"; // install with: npm install html2pdf.js
import "../styles/CVPreview.css";

export default function CVPreview({
  generalInfo,
  about,
  educationList,
  experienceList,
  template,
}) {
  const cvRef = useRef();

  // Export CV as PDF
  function handleExportPDF() {
    const element = cvRef.current;
    const options = {
      margin: 0.5,
      filename: "my-cv.pdf",
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
    };
    html2pdf().set(options).from(element).save();
  }

  return (
    <div className="cv-preview-wrapper">
      <div className={`cv-preview template-${template}`} ref={cvRef}>
        <header>
          <h1>{generalInfo.name || "Your Name"}</h1>
          <p>
            {generalInfo.email} | {generalInfo.phone}
          </p>
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
                  <p><strong>School:</strong> {edu.school}</p>
                  <p><strong>Study:</strong> {edu.study}</p>
                  <p><strong>Date:</strong> {edu.date}</p>
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
                  <p><strong>Company:</strong> {exp.company}</p>
                  <p><strong>Position:</strong> {exp.position}</p>
                  <p><strong>Responsibilities:</strong> {exp.responsibilities}</p>
                  <p><strong>From:</strong> {exp.fromDate}</p>
                  <p><strong>Until:</strong> {exp.untilDate}</p>
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
