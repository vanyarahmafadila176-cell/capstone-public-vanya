import { useState } from 'react'

function LoginPage({ onSubmit, onSignup, onBack }) {

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()

    // VALIDASI EMAIL
    if (
      username.includes('@') ||
      username.includes('gmail.com')
    ) {
      alert('Gunakan username, bukan email')
      return
    }

    // LOGIN
    onSubmit({
      username: username.trim(),
      password,
    })
  }

  return (
    <form
      className="screen center"
      onSubmit={handleSubmit}
    >

      {/* BUTTON KEMBALI */}
      <button
        className="back-link highlight-back"
        type="button"
        onClick={onBack}
      >
        ← Kembali
      </button>

      {/* LOGO */}
      <div className="logo login-logo">
        ADUIN
      </div>

      {/* TITLE */}
      <h2 className="login-title">
        Login
      </h2>

      {/* USERNAME */}
      <input
        className="field"
        type="text"
        placeholder="Masukkan username"
        value={username}
        onChange={(event) => {

          let value = event.target.value

          // HAPUS @
          value = value.replace(/@/g, '')

          // HAPUS gmail.com
          value = value.replace(/gmail\.com/g, '')

          // HAPUS SPASI
          value = value.replace(/\s/g, '')

          setUsername(value)
        }}
        required
      />

      {/* PASSWORD */}
      <input
        className="field"
        type="password"
        placeholder="Masukkan password"
        value={password}
        onChange={(event) =>
          setPassword(event.target.value)
        }
        required
      />

      {/* BUTTON LOGIN */}
      <button
        className="btn primary full"
        type="submit"
      >
        Masuk
      </button>

      {/* SIGN UP */}
      <button
        className="link-btn"
        type="button"
        onClick={onSignup}
      >
        Belum punya akun? Sign up
      </button>

    </form>
  )
}

export default LoginPage