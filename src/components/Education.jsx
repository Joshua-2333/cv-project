import { useState } from "react";
import "../styles/Education.css";

export default function Education({ educationList, setEducation }) {
  const [form, setForm] = useState({
    school: "",
    degree: "",
    location: "",
    startDate: "",
    endDate: "",
    description: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [showForm, setShowForm] = useState(false);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (isEditing) {
      const updated = [...educationList];
      updated[editIndex] = form;
      setEducation(updated);
      setIsEditing(false);
      setEditIndex(null);
    } else {
      setEducation([...educationList, form]);
    }
    setForm({
      school: "",
      degree: "",
      location: "",
      startDate: "",
      endDate: "",
      description: "",
    });
    setShowForm(false);
  }

  function handleEdit(index) {
    setForm(educationList[index]);
    setIsEditing(true);
    setEditIndex(index);
    setShowForm(true);
  }

  function handleDelete(index) {
    const updated = educationList.filter((_, i) => i !== index);
    setEducation(updated);
  }

  return (
    <section className="education-section">
      <div className="education-header">
        <h2>Education</h2>
        <button
          type="button"
          className="toggle-form-btn"
          onClick={() => setShowForm(!showForm)}
        >
          {showForm ? "Close" : "Add"}
        </button>
      </div>

      {showForm && (
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
            name="degree"
            placeholder="Degree / Field of Study"
            value={form.degree}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="location"
            placeholder="Location"
            value={form.location}
            onChange={handleChange}
          />
          <div className="date-row">
            <input
              type="text"
              name="startDate"
              placeholder="Start Date"
              value={form.startDate}
              onChange={handleChange}
            />
            <input
              type="text"
              name="endDate"
              placeholder="End Date"
              value={form.endDate}
              onChange={handleChange}
            />
          </div>
          <textarea
            name="description"
            placeholder="Description / Achievements"
            value={form.description}
            onChange={handleChange}
            rows="3"
          />
          <button type="submit" className="submit-btn">
            {isEditing ? "Update" : "Add Education"}
          </button>
        </form>
      )}

      <ul className="education-list">
        {educationList.map((edu, index) => (
          <li key={index} className="education-card">
            <div className="edu-top">
              <h3>{edu.degree || "Untitled Degree"}</h3>
              <p className="edu-dates">
                {edu.startDate} {edu.endDate ? ` - ${edu.endDate}` : ""}
              </p>
            </div>
            <p className="edu-school">
              {edu.school}
              {edu.location && `, ${edu.location}`}
            </p>
            {edu.description && (
              <p className="edu-description">{edu.description}</p>
            )}
            <div className="education-card-buttons">
              <button onClick={() => handleEdit(index)}>Edit</button>
              <button onClick={() => handleDelete(index)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
