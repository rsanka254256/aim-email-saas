"use client";
import { useState } from "react";

export default function Home() {
  const [formData, setFormData] = useState({
    from: "",
    to: "",
    subject: "",
    text: "",
  });
  const [message, setMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch("/api/send", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    const data = await res.json();
    setMessage(data.message || "❌ Nepodařilo se odeslat e-mail");
  };

  return (
    <main style={{ padding: "2rem", maxWidth: "600px", margin: "0 auto" }}>
      <h1>AIM Email SaaS</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Odesílatel:</label>
          <input type="email" name="from" value={formData.from} onChange={handleChange} required />
        </div>
        <div>
          <label>Příjemce:</label>
          <input type="email" name="to" value={formData.to} onChange={handleChange} required />
        </div>
        <div>
          <label>Předmět:</label>
          <input type="text" name="subject" value={formData.subject} onChange={handleChange} required />
        </div>
        <div>
          <label>Zpráva:</label>
          <textarea name="text" value={formData.text} onChange={handleChange} rows={5} required />
        </div>
        <button type="submit">Odeslat</button>
      </form>
      {message && <p>{message}</p>}
    </main>
  );
}
