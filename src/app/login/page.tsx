"use client"
import { useState } from "react"

export default function LoginPage() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const url = `${process.env.NEXT_PUBLIC_API_URL}/api/auth/login`;
    console.log(url);

    // Make the API request using fetch
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    })
      .then(response => {
        if (response.ok) {
          return response.json()
        }
        throw new Error('Login failed')
      })
      .then(data => {
        const token = data.token // Assuming the token is in the response data
        localStorage.setItem('token', token) // Store the token in localStorage
        localStorage.setItem('username', username) // Store the username in localStorage
        console.log("Logged in successfully:", data)
        // Redirect or perform any other actions after successful login
      })
      .catch(error => {
        console.error("Login error:", error)
        // Handle error (e.g., show a message to the user)
      })
  }

  return (
    <div className="flex items-center justify-center h-screen">
      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-3xl font-bold mb-4">Login</h1>
        <div className="flex flex-col mb-4">
          <label htmlFor="username" className="mb-2">Username</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={event => setUsername(event.target.value)}
            className="border p-2 rounded-lg"
          />
        </div>
        <div className="flex flex-col mb-4">
          <label htmlFor="password" className="mb-2">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={event => setPassword(event.target.value)}
            className="border p-2 rounded-lg"
          />
        </div>
        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg">
          Login
        </button>
      </form>
    </div>
  )
}
