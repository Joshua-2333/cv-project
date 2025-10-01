// src/components/Education.jsx
import { useState } from "react";
import "../styles/Education.css";

export default function Education() {
  const [educations, setEducations] = useState([]);
  const [form, setForm] = useState({ school: "", study: "", date: "" });
  const [isEditing, setIsEditing] = useState(false);
  const [editIndex, setEditIndex] = useState(null);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (isEditing) {
      // update existing entry
      const updated = [...educations];
      updated[editIndex] = form;
      setEducations(updated);
      setIsEditing(false);
      setEditIndex(null);
    } else {
      // add new entry
      setEducations([...educations, form]);
    }
    setForm({ school: "", study: "", date: "" }); // reset form
  }

  function handleEdit(index) {
    setForm(educations[index]);
    setIsEditing(true);
    setEditIndex(index);
  }

  function handleDelete(index) {
    setEducations(educations.filter((_, i) => i !== index));
  }

  return (
    <section className="education">
      <h2>Education</h2>

      <form onSubmit={handleSubmit} className="education-form">
        <input
          type="text"
          name="school"
          placeholder="School Name"
          value={form.school}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="study"
          placeholder="Title of Study"
          value={form.study}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="date"
          placeholder="Date of Study"
          value={form.date}
          onChange={handleChange}
          required
        />
        <button type="submit">{isEditing ? "Update" : "Add"}</button>
      </form>

      <div className="education-list">
        {educations.map((edu, index) => (
          <div key={index} className="education-entry">
            <p><strong>School:</strong> {edu.school}</p>
            <p><strong>Study:</strong> {edu.study}</p>
            <p><strong>Date:</strong> {edu.date}</p>
            <button onClick={() => handleEdit(index)}>Edit</button>
            <button onClick={() => handleDelete(index)}>Delete</button>
          </div>
        ))}
      </div>
    </section>
  );
}
