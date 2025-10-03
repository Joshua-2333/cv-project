import { useState } from "react";
import "../styles/Skills.css";

export default function Skills({ skills = [], onChange }) {
  const [input, setInput] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [editIndex, setEditIndex] = useState(null);

  // Add or update skill
  function handleSubmit(e) {
    e.preventDefault();
    const trimmed = input.trim();
    if (!trimmed) return;

    let updatedSkills;

    if (isEditing) {
      updatedSkills = [...skills];
      updatedSkills[editIndex] = trimmed;
      setIsEditing(false);
      setEditIndex(null);
    } else {
      // prevent duplicates
      if (skills.includes(trimmed)) {
        setInput("");
        return;
      }
      updatedSkills = [...skills, trimmed];
    }

    setInput("");
    onChange(updatedSkills); // update parent state
  }

  // Edit a skill
  function handleEdit(index) {
    setInput(skills[index]);
    setIsEditing(true);
    setEditIndex(index);
  }

  // Delete a skill
  function handleDelete(index) {
    const updated = skills.filter((_, i) => i !== index);
    onChange(updated);
    if (isEditing && editIndex === index) handleCancelEdit();
  }

  // Cancel editing
  function handleCancelEdit() {
    setInput("");
    setIsEditing(false);
    setEditIndex(null);
  }

  // Clear all skills
  function handleClearAll() {
    onChange([]);
    handleCancelEdit();
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
        <button type="submit" disabled={!input.trim()}>
          {isEditing ? "Update" : "Add"}
        </button>
        {isEditing && (
          <button type="button" onClick={handleCancelEdit}>
            Cancel
          </button>
        )}
        {skills.length > 0 && !isEditing && (
          <button type="button" onClick={handleClearAll}>
            Clear All
          </button>
        )}
      </form>

      {skills.length > 0 ? (
        <ul className="skills-list">
          {skills.map((skill, index) => (
            <li key={index} className="skills-item">
              <span>{skill}</span>
              <div className="skills-actions">
                <button
                  type="button"
                  onClick={() => handleEdit(index)}
                  aria-label={`Edit ${skill}`}
                >
                </button>
                <button
                  type="button"
                  onClick={() => handleDelete(index)}
                  aria-label={`Delete ${skill}`}
                >
                  </button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="placeholder">No skills added yet.</p>
      )}
    </section>
  );
}
