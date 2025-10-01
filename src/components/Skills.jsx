// src/components/Skills.jsx
import { useState } from "react";
import "../styles/Skills.css";

export default function Skills({ onChange }) {
  const [skills, setSkills] = useState([]);
  const [input, setInput] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [editIndex, setEditIndex] = useState(null);

  function handleSubmit(e) {
    e.preventDefault();
    if (!input.trim()) return;

    if (isEditing) {
      const updated = [...skills];
      updated[editIndex] = input.trim();
      setSkills(updated);
      setIsEditing(false);
      setEditIndex(null);
    } else {
      setSkills([...skills, input.trim()]);
    }

    setInput("");
    onChange([...skills, input.trim()]); // send to App
  }

  function handleEdit(index) {
    setInput(skills[index]);
    setIsEditing(true);
    setEditIndex(index);
  }

  function handleDelete(index) {
    const updated = skills.filter((_, i) => i !== index);
    setSkills(updated);
    onChange(updated);
  }

  return (
    <section className="skills">
      <h2>Skills</h2>
      <form onSubmit={handleSubmit} className="skills-form">
        <input
          type="text"
          placeholder="Enter a skill (e.g. JavaScript, Communication)"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button type="submit">{isEditing ? "Update" : "Add"}</button>
      </form>

      <ul className="skills-list">
        {skills.map((skill, index) => (
          <li key={index}>
            {skill}
            <button onClick={() => handleEdit(index)}>Edit</button>
            <button onClick={() => handleDelete(index)}>Delete</button>
          </li>
        ))}
      </ul>
    </section>
  );
}
