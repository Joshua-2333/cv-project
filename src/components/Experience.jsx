import { useState } from "react";
import "../styles/Experience.css";

export default function Experience() {
  const [experience, setExperience] = useState({
    company: "",
    position: "",
    responsibilities: "",
    fromDate: "",
    untilDate: "",
  });

  const [isEditing, setIsEditing] = useState(true);

  function handleChange(e) {
    const { name, value } = e.target;
    setExperience((prev) => ({
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
    <section className="experience">
      <h2>Experience</h2>

      {isEditing ? (
        <form onSubmit={handleSubmit} className="experience-form">
          <label>
            Company
            <input
              type="text"
              name="company"
              placeholder="Company Name"
              value={experience.company}
              onChange={handleChange}
              required
            />
          </label>

          <label>
            Position
            <input
              type="text"
              name="position"
              placeholder="Position Title"
              value={experience.position}
              onChange={handleChange}
              required
            />
          </label>

          <label>
            Responsibilities
            <textarea
              name="responsibilities"
              placeholder="Main Responsibilities"
              value={experience.responsibilities}
              onChange={handleChange}
              rows={4}
              required
            ></textarea>
          </label>

          <label>
            From
            <input
              type="text"
              name="fromDate"
              placeholder="e.g. Jan 2020"
              value={experience.fromDate}
              onChange={handleChange}
              required
            />
          </label>

          <label>
            Until
            <input
              type="text"
              name="untilDate"
              placeholder="e.g. Present"
              value={experience.untilDate}
              onChange={handleChange}
              required
            />
          </label>

          <button type="submit">Save</button>
        </form>
      ) : (
        <div className="experience-display">
          <p><strong>Company:</strong> {experience.company}</p>
          <p><strong>Position:</strong> {experience.position}</p>
          <p><strong>Responsibilities:</strong> {experience.responsibilities}</p>
          <p><strong>From:</strong> {experience.fromDate}</p>
          <p><strong>Until:</strong> {experience.untilDate}</p>
          <button onClick={handleEdit}>Edit</button>
        </div>
      )}
    </section>
  );
}
