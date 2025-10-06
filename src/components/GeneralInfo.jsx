// src/components/GeneralInfo.jsx
import React from "react";
import "../styles/GeneralInfo.css";

export default function GeneralInfo({ generalInfo = {}, setGeneralInfo }) {
  const info = {
    name: generalInfo.name || "",
    email: generalInfo.email || "",
    phone: generalInfo.phone || "",
  };

  // Format phone number as (123) 456-7890
  function formatPhoneNumber(value) {
    const digits = value.replace(/\D/g, "").substring(0, 10);
    const len = digits.length;
    if (len < 4) return digits;
    if (len < 7) return `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
    return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6, 10)}`;
  }

  // Validations
  function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  function isValidName(name) {
    return name.trim().split(" ").length >= 2;
  }

  function isValidPhone(phone) {
    return /^\(\d{3}\) \d{3}-\d{4}$/.test(phone);
  }

  return (
    <section className="general-info">
      <h2>General Information</h2>
      <form className="general-info-form">
        {/* Name */}
        <input
          type="text"
          name="name"
          placeholder="Full Name (e.g., John Doe)"
          value={info.name}
          onChange={(e) =>
            setGeneralInfo((prev) => ({ ...prev, name: e.target.value }))
          }
          className={info.name ? (isValidName(info.name) ? "valid" : "invalid") : ""}
          required
        />
        {info.name && !isValidName(info.name) && (
          <small className="error">Enter at least first and last name</small>
        )}

        {/* Email */}
        <input
          type="email"
          name="email"
          placeholder="Email (e.g., john@example.com)"
          value={info.email}
          onChange={(e) =>
            setGeneralInfo((prev) => ({ ...prev, email: e.target.value }))
          }
          className={info.email ? (isValidEmail(info.email) ? "valid" : "invalid") : ""}
          required
        />
        {info.email && !isValidEmail(info.email) && (
          <small className="error">Invalid email address</small>
        )}

        {/* Phone */}
        <input
          type="tel"
          name="phone"
          placeholder="Phone (e.g., (123) 456-7890)"
          value={info.phone}
          onChange={(e) =>
            setGeneralInfo((prev) => ({
              ...prev,
              phone: formatPhoneNumber(e.target.value),
            }))
          }
          className={info.phone ? (isValidPhone(info.phone) ? "valid" : "invalid") : ""}
          required
        />
        {info.phone && !isValidPhone(info.phone) && (
          <small className="error">Invalid phone format</small>
        )}
      </form>
    </section>
  );
}
