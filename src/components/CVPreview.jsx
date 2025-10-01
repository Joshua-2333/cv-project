import "../styles/App.css";

export default function CVPreview({ general, education, experience }) {
  return (
    <div className="cv-preview">
      <h2>CV Preview</h2>

      <section>
        <h3>General Info</h3>
        <p><strong>Name:</strong> {general.name}</p>
        <p><strong>Email:</strong> {general.email}</p>
        <p><strong>Phone:</strong> {general.phone}</p>
      </section>

      <section>
        <h3>Education</h3>
        <p><strong>School:</strong> {education.school}</p>
        <p><strong>Study:</strong> {education.study}</p>
        <p><strong>Date:</strong> {education.date}</p>
      </section>

      <section>
        <h3>Experience</h3>
        <p><strong>Company:</strong> {experience.company}</p>
        <p><strong>Position:</strong> {experience.position}</p>
        <p><strong>Responsibilities:</strong> {experience.responsibilities}</p>
        <p><strong>From:</strong> {experience.fromDate}</p>
        <p><strong>Until:</strong> {experience.untilDate}</p>
      </section>
    </div>
  );
}
