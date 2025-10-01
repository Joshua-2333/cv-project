import { useState } from "react";
import "../styles/Education.css";

export default function Education() {
  const [education, setEducation] = useState({
    school: "",
    study: "",
    date: "",
  });

  const [isEditing, setIsEditing] = useState(true);

  function handleChange(e) {
    const { name, value } = e.target;
    setEducation((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    setIsEditing(false);
  }

  function handleEdit() {
    setIsEditing(true);
  }

  return (
    <section className="education">
      <h2>Education</h2>

      {isEditing ? (
        <form onSubmit={handleSubmit} className="education-form">
          <label>
            School
            <input
              type="text"
              name="school"
              placeholder="School Name"
              value={education.school}
              onChange={handleChange}
              required
            />
          </label>

          <label>
            Title of Study
            <input
              type="text"
              name="study"
              placeholder="Field of Study"
              value={education.study}
              onChange={handleChange}
              required
            />
          </label>

          <label>
            Date of Study
            <input
              type="text"
              name="date"
              placeholder="e.g. 2018 – 2022"
              value={education.date}
              onChange={handleChange}
              required
            />
          </label>

          <button type="submit">Save</button>
        </form>
      ) : (
        <div className="education-display">
          <p><strong>School:</strong> {education.school}</p>
          <p><strong>Study:</strong> {education.study}</p>
          <p><strong>Date:</strong> {education.date}</p>
          <button onClick={handleEdit}>Edit</button>
        </div>
      )}
    </section>
  );
}
