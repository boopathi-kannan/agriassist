import React, { useState, useEffect, useRef } from 'react'
import axios from 'axios'
import { FaUser, FaRobot } from 'react-icons/fa'

const Chatbot = () => {
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')
  const messagesEndRef = useRef(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const sendMessage = async () => {
    if (!input.trim()) return
    const userMessage = { sender: 'user', text: input }
    setMessages((prev) => [...prev, userMessage])

    try {
      const res = await axios.post('/api/chatbot', {
        message: input,
      })
      const botMessage = { sender: 'bot', text: res.data.reply }
      setMessages((prev) => [...prev, botMessage])
      setInput('')
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <div className="max-w-3xl mx-auto mt-12 p-6 bg-gradient-to-tr from-green-50 to-green-100 rounded-xl shadow-2xl border border-green-400">
      <h2 className="text-4xl font-extrabold text-green-700 mb-6 flex items-center gap-3">
        🌾 Agri Assist Chatbot
      </h2>

      <div className="h-[30rem] overflow-y-auto mb-6 p-4 bg-white rounded-xl shadow-inner scrollbar-thin scrollbar-thumb-green-400 scrollbar-track-green-100">
        {messages.length === 0 ? (
          <p className="text-center text-green-400 italic select-none">
            Ask me anything about farming, crops, pests, or irrigation!
          </p>
        ) : (
          messages.map((msg, idx) => (
            <div
              key={idx}
              className={`mb-4 flex items-end gap-2 ${
                msg.sender === 'user' ? 'justify-end' : 'justify-start'
              }`}
            >
              {msg.sender === 'bot' && (
                <FaRobot className="text-green-600 text-xl" />
              )}
              <span
                className={`inline-block max-w-[75%] px-5 py-3 rounded-2xl text-base animate-fadeIn
                ${
                  msg.sender === 'user'
                    ? 'bg-green-500 text-white rounded-br-none shadow-md'
                    : 'bg-green-100 text-green-900 border border-green-300 rounded-bl-none shadow-sm'
                }`}
              >
                {msg.text}
              </span>
              {msg.sender === 'user' && (
                <FaUser className="text-green-700 text-xl" />
              )}
            </div>
          ))
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="flex gap-3">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') sendMessage()
          }}
          placeholder="Ask something about farming..."
          className="flex-grow border border-green-400 rounded-l-full px-5 py-3 focus:outline-none focus:ring-2 focus:ring-green-400 transition text-green-700 bg-white shadow-sm"
        />
        <button
          onClick={sendMessage}
          className="bg-green-600 text-white px-6 py-3 rounded-r-full hover:bg-green-700 transition font-semibold shadow-lg"
        >
          Send
        </button>
      </div>
    </div>
  )
}

export default Chatbot
