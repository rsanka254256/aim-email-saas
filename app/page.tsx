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
      <h1 style={{ fontSize: "2rem", marginBottom: "1rem" }}>AIM Email SaaS</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email odesílatele:</label>
          <input
            type="email"
            name="from"
            value={formData.from}
            onChange={handleChange}
            required
            placeholder="Zadejte svůj e-mail"
            style={{ width: "100%", padding: "8px", marginBottom: "1rem" }}
          />
        </div>
        <div>
          <label>Email příjemce:</label>
          <input
            type="email"
            name="to"
            value={formData.to}
            onChange={handleChange}
            required
            placeholder="Zadejte příjemce"
            style={{ width: "100%", padding: "8px", marginBottom: "1rem" }}
          />
        </div>
        <div>
          <label>Předmět:</label>
          <input
            type="text"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            required
            placeholder="Zadejte předmět e-mailu"
            style={{ width: "100%", padding: "8px", marginBottom: "1rem" }}
          />
        </div>
        <div>
          <label>Obsah e-mailu:</label>
          <textarea
            name="text"
            value={formData.text}
            onChange={handleChange}
            required
            rows={5}
            placeholder="Zadejte text e-mailu"
            style={{ width: "100%", padding: "8px", marginBottom: "1rem" }}
          />
        </div>
        <button type="submit" style={{ padding: "10px 20px" }}>Odeslat e-mail</button>
      </form>
      {message && <p style={{ marginTop: "1rem" }}>{message}</p>}
    </main>
  );
}
