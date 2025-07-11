'use client'

import React, { useState } from 'react'

export default function HomePage() {
  const [subject, setSubject] = useState('')
  const [body, setBody] = useState('')
  const [status, setStatus] = useState('')

  const handleSend = async () => {
    setStatus('Odesílám...')
    const res = await fetch('/api/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ subject, body })
    })
    const data = await res.json()
    setStatus(data.message)
  }

  return (
    <div>
      <label className="block mb-2">Předmět:</label>
      <input
        type="text"
        value={subject}
        onChange={(e) => setSubject(e.target.value)}
        className="w-full p-2 border mb-4"
        placeholder="Zadejte předmět e-mailu"
      />

      <label className="block mb-2">Obsah e-mailu:</label>
      <textarea
        value={body}
        onChange={(e) => setBody(e.target.value)}
        className="w-full p-2 border mb-4 h-40"
        placeholder="Zadejte text e-mailu"
      />

      <button onClick={handleSend} className="bg-blue-600 text-white px-4 py-2 rounded">
        Odeslat e-mail
      </button>

      {status && <p className="mt-4">{status}</p>}
    </div>
  )
}
