// src/components/CVPreview.jsx
import "../styles/CVPreview.css";

export default function CVPreview({ generalInfo, educationList, experienceList }) {
  return (
    <div className="cv-preview">
      <h2>CV Preview</h2>

      {/* General Info */}
      <section className="preview-section">
        <h3>General Information</h3>
        <p><strong>Name:</strong> {generalInfo.name}</p>
        <p><strong>Email:</strong> {generalInfo.email}</p>
        <p><strong>Phone:</strong> {generalInfo.phone}</p>
      </section>

      {/* Education */}
      <section className="preview-section">
        <h3>Education</h3>
        {educationList.length > 0 ? (
          <ul>
            {educationList.map((edu, index) => (
              <li key={index}>
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
        <h3>Experience</h3>
        {experienceList.length > 0 ? (
          <ul>
            {experienceList.map((exp, index) => (
              <li key={index}>
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
  );
}
