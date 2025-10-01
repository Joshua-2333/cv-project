// src/components/GeneralInfo.jsx
import { useState } from "react";
import "../styles/GeneralInfo.css";

export default function GeneralInfo({ onSubmit }) {
  // State for the form values
  const [info, setInfo] = useState({
    name: "",
    email: "",
    phone: "",
  });

  // State to toggle between editing and displaying
  const [isEditing, setIsEditing] = useState(true);

  // Handle input changes
  function handleChange(e) {
    const { name, value } = e.target;
    setInfo((prevInfo) => ({
      ...prevInfo,
      [name]: value,
    }));
  }

  // Handle submit
  function handleSubmit(e) {
    e.preventDefault();
    setIsEditing(false); // switch to display mode
    onSubmit(info);      // ⬅ send data to App
  }

  // Handle edit
  function handleEdit() {
    setIsEditing(true); // switch back to form mode
  }

  return (
    <div className="general-info">
      <h2>General Information</h2>

      {isEditing ? (
        <form onSubmit={handleSubmit} className="general-info-form">
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={info.name}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={info.email}
            onChange={handleChange}
            required
          />
          <input
            type="tel"
            name="phone"
            placeholder="Phone Number"
            value={info.phone}
            onChange={handleChange}
            required
          />

          <button type="submit">Submit</button>
        </form>
      ) : (
        <div className="general-info-display">
          <p><strong>Name:</strong> {info.name}</p>
          <p><strong>Email:</strong> {info.email}</p>
          <p><strong>Phone:</strong> {info.phone}</p>
          <button onClick={handleEdit}>Edit</button>
        </div>
      )}
    </div>
  );
}
