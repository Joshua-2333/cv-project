// src/components/Experience.jsx
import { useState } from "react";
import "../styles/Experience.css";

export default function Experience({ experienceList, setExperience }) {
  const [form, setForm] = useState({
    company: "",
    position: "",
    responsibilities: "",
    fromDate: "",
    untilDate: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [editIndex, setEditIndex] = useState(null);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (isEditing) {
      const updated = [...experienceList];
      updated[editIndex] = form;
      setExperience(updated);
      setIsEditing(false);
      setEditIndex(null);
    } else {
      setExperience([...experienceList, form]);
    }
    setForm({
      company: "",
      position: "",
      responsibilities: "",
      fromDate: "",
      untilDate: "",
    });
  }

  function handleEdit(index) {
    setForm(experienceList[index]);
    setIsEditing(true);
    setEditIndex(index);
  }

  function handleDelete(index) {
    const updated = experienceList.filter((_, i) => i !== index);
    setExperience(updated);
  }

  return (
    <section className="experience">
      <h2>Experience</h2>

      {/* Form for adding/editing entries */}
      <form onSubmit={handleSubmit} className="experience-form">
        <input
          type="text"
          name="company"
          placeholder="Company Name"
          value={form.company}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="position"
          placeholder="Position Title"
          value={form.position}
          onChange={handleChange}
          required
        />
        <textarea
          name="responsibilities"
          placeholder="Main Responsibilities"
          value={form.responsibilities}
          onChange={handleChange}
          rows={3}
          required
        />
        <input
          type="text"
          name="fromDate"
          placeholder="From (e.g. Jan 2020)"
          value={form.fromDate}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="untilDate"
          placeholder="Until (e.g. Present)"
          value={form.untilDate}
          onChange={handleChange}
          required
        />
        <button type="submit">{isEditing ? "Update" : "Add"}</button>
      </form>

      {/* Experience entries list */}
      <ul className="experience-list">
        {experienceList.map((exp, index) => (
          <li key={index} className="experience-entry">
            {exp.company && <p><strong>Company:</strong> {exp.company}</p>}
            {exp.position && <p><strong>Position:</strong> {exp.position}</p>}
            {exp.responsibilities && <p><strong>Responsibilities:</strong> {exp.responsibilities}</p>}
            {(exp.fromDate || exp.untilDate) && (
              <p>
                <strong>Duration:</strong> {exp.fromDate || "Start"} – {exp.untilDate || "Present"}
              </p>
            )}
            <div className="experience-entry-buttons">
              <button onClick={() => handleEdit(index)}>Edit</button>
              <button onClick={() => handleDelete(index)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
