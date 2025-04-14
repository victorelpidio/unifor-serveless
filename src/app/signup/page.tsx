"use client";
import { useState } from "react";

export default function SignupPage() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rePassword, setRePassword] = useState('');

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (password !== rePassword) {
      alert("Passwords must match");
      return;
    }

    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, email, password, rePassword }),
    })
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error('Signup failed');
      })
      .then(data => {
        console.log("Signed up successfully:", data);
        // Redirect or perform any other actions after successful signup
      })
      .catch(error => {
        console.error("Signup error:", error);
        // Handle error (e.g., show a message to the user)
      });
  }

  return (
    <div className="flex items-center justify-center h-screen">
      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-lg p-8 w-[50%]">
        <h1 className="text-3xl font-bold mb-4">Cadastrar</h1>
        <div className="flex flex-col mb-4">
          <label htmlFor="username" className="mb-2">Nome de usuário</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={event => setUsername(event.target.value)}
            className="border p-2 rounded-lg"
          />
        </div>
        <div className="flex flex-col mb-4">
          <label htmlFor="email" className="mb-2">E-mail</label>
          <input
            type="text"
            id="email"
            value={email}
            onChange={event => setEmail(event.target.value)}
            className="border p-2 rounded-lg"
          />
        </div>
        <div className="flex flex-col mb-4">
          <label htmlFor="password" className="mb-2">Senha</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={event => setPassword(event.target.value)}
            className="border p-2 rounded-lg"
          />
        </div>
        <div className="flex flex-col mb-4">
          <label htmlFor="rePassword" className="mb-2">Confirme a senha</label>
          <input
            type="password"
            id="rePassword"
            value={rePassword}
            onChange={event => setRePassword(event.target.value)}
            className="border p-2 rounded-lg"
          />
        </div>
        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg cursor-pointer">
          Cadastrar
        </button>
      </form>
    </div>
  );
}