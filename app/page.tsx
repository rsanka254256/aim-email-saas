'use client'

import { useState } from 'react'

export default function HomePage() {
  const [to, setTo] = useState('')
  const [subject, setSubject] = useState('')
  const [text, setText] = useState('')
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setMessage('')
    setLoading(true)

    const res = await fetch('/api/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ to, subject, text }),
    })

    const data = await res.json()
    setLoading(false)

    if (res.ok) {
      setMessage('E-mail byl úspěšně odeslán.')
      setTo('')
      setSubject('')
      setText('')
    } else {
      setMessage(`Chyba: ${data.message || 'Nepodařilo se odeslat e-mail'}`)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-xl mx-auto mt-12 space-y-4">
      <div>
        <label className="block mb-1 font-semibold">Komu</label>
        <input
          type="email"
          className="w-full p-2 border border-gray-300 rounded"
          value={to}
          onChange={(e) => setTo(e.target.value)}
          required
        />
      </div>

      <div>
        <label className="block mb-1 font-semibold">Předmět</label>
        <input
          type="text"
          className="w-full p-2 border border-gray-300 rounded"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          required
        />
      </div>

      <div>
        <label className="block mb-1 font-semibold">Zpráva</label>
        <textarea
          className="w-full p-2 border border-gray-300 rounded"
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={5}
          required
        />
      </div>

      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
        disabled={loading}
      >
        {loading ? 'Odesílání...' : 'Odeslat e-mail'}
      </button>

      {message && <p className="mt-4 text-center">{message}</p>}
    </form>
  )
}
