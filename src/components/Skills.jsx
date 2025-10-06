import { useState } from "react";
import "../styles/Skills.css";

export default function Skills({ skills = [], onChange }) {
  const [input, setInput] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [editIndex, setEditIndex] = useState(null);

  const trimmedInput = input.trim();

  function handleSubmit(e) {
    e.preventDefault();
    if (!trimmedInput) return;

    let updatedSkills;

    if (isEditing) {
      updatedSkills = [...skills];
      updatedSkills[editIndex] = trimmedInput;
      setIsEditing(false);
      setEditIndex(null);
    } else {
      if (skills.includes(trimmedInput)) {
        setInput("");
        return;
      }
      updatedSkills = [...skills, trimmedInput];
    }

    onChange(updatedSkills);
    setInput("");
  }

  function handleEdit(index) {
    setInput(skills[index]);
    setIsEditing(true);
    setEditIndex(index);
  }

  function handleDelete(index) {
    const updated = skills.filter((_, i) => i !== index);
    onChange(updated);
    if (isEditing && editIndex === index) handleCancelEdit();
  }

  function handleCancelEdit() {
    setInput("");
    setIsEditing(false);
    setEditIndex(null);
  }

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
        <button type="submit" disabled={!trimmedInput}>
          {isEditing ? "Update" : "Add"}
        </button>

        {isEditing && (
          <button type="button" onClick={handleCancelEdit}>
            Cancel
          </button>
        )}

        {!isEditing && skills.length > 0 && (
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
                {/* Edit Button */}
                <button
                  type="button"
                  onClick={() => handleEdit(index)}
                  aria-label={`Edit ${skill}`}
                  className="edit-btn"
                >
                  <span className="material-symbols-outlined">edit</span>
                </button>

                {/* Delete Button */}
                <button
                  type="button"
                  onClick={() => handleDelete(index)}
                  aria-label={`Delete ${skill}`}
                  className="delete-btn"
                >
                  <span className="material-symbols-outlined">delete</span>
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
