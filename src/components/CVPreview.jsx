import { forwardRef } from "react";
import "../styles/CVPreview.css";

const CVPreview = forwardRef(
  (
    {
      generalInfo = {},
      about = "",
      educationList = [],
      experienceList = [],
      skills = [],
      template = "classic",
    },
    ref
  ) => {
    return (
      <div className="cv-preview-wrapper">
        <div className={`cv-preview template-${template}`} ref={ref}>
          {/* ===== Header ===== */}
          <header className="cv-header">
            <h1>{generalInfo.name || "Your Name"}</h1>
            <p>
              {generalInfo.email || "email@example.com"} •{" "}
              {generalInfo.phone || "123-456-7890"}
            </p>
          </header>

          {/* ===== About Me ===== */}
          <section className="cv-section about">
            <h2>About Me</h2>
            {about ? (
              <p>{about}</p>
            ) : (
              <p className="placeholder">Tell us about yourself.</p>
            )}
          </section>

          {/* ===== Education ===== */}
          <section className="cv-section education">
            <h2>Education</h2>
            {educationList.length ? (
              <ul className="cv-education-list">
                {educationList.map((edu, i) => {
                  const eduDate =
                    edu.startDate && edu.endDate
                      ? `${edu.startDate} – ${edu.endDate}`
                      : edu.startDate || edu.endDate || "";

                  return (
                    <li key={i} className="cv-education-item">
                      <div className="edu-header">
                        <strong className="edu-school">
                          {edu.school || "School Name"}
                        </strong>
                        {eduDate && <span className="edu-date">{eduDate}</span>}
                      </div>
                      {edu.degree && <p className="edu-degree">{edu.degree}</p>}
                      {edu.location && <p className="edu-location">{edu.location}</p>}
                      {edu.description && (
                        <p className="edu-description">{edu.description}</p>
                      )}
                    </li>
                  );
                })}
              </ul>
            ) : (
              <p className="placeholder">No education added yet.</p>
            )}
          </section>

          {/* ===== Experience ===== */}
          <section className="cv-section experience">
            <h2>Experience</h2>
            {experienceList.length ? (
              <ul className="cv-experience-list">
                {experienceList.map((exp, i) => (
                  <li key={i} className="cv-experience-item">
                    <div className="exp-header">
                      <strong className="exp-company">
                        {exp.company || "Company Name"}
                      </strong>
                      {(exp.fromDate || exp.untilDate) && (
                        <span className="exp-date">
                          {exp.fromDate || "Start"} – {exp.untilDate || "Present"}
                        </span>
                      )}
                    </div>
                    {exp.position && <p className="exp-position">{exp.position}</p>}
                    {exp.responsibilities && (
                      <p className="exp-resp">{exp.responsibilities}</p>
                    )}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="placeholder">No experience added yet.</p>
            )}
          </section>

          {/* ===== Skills ===== */}
          <section className="cv-section skills">
            <h2>Skills</h2>
            {skills.length ? (
              <ul className="skills-preview">
                {skills.map((skill, i) => (
                  <li key={i} className="skill-chip">
                    {skill}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="placeholder">No skills added yet.</p>
            )}
          </section>
        </div>
      </div>
    );
  }
);

export default CVPreview;
