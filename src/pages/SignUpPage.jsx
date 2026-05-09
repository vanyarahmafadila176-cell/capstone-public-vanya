import { useState } from 'react'

function SignUpPage({ onSubmit, onBack }) {

  const [name, setName] = useState('')
  const [localEmail, setLocalEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [emailError, setEmailError] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()

    // VALIDASI EMAIL
    if (localEmail.includes('@')) {
      setEmailError(
        'Cukup isi nama email saja, @gmail.com sudah otomatis.'
      )
      return
    }

    // VALIDASI PASSWORD
    if (password !== confirmPassword) return

    setEmailError('')

    onSubmit({
      name: name.trim(),
      localEmail: localEmail
        .trim()
        .toLowerCase(),
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
        Daftar Akun
      </h2>

      {/* NAMA */}
      <input
        className="field"
        placeholder="Masukkan nama"
        value={name}
        onChange={(event) =>
          setName(event.target.value)
        }
        required
      />

      {/* EMAIL */}
      <div className="email-group">

        <input
          className="field email-input"
          placeholder="Masukkan nama email"
          value={localEmail}
          onChange={(event) => {

            let value = event.target.value

            // HAPUS SPASI
            value = value.replace(/\s+/g, '')

            // HAPUS @
            value = value.replace(/@/g, '')

            // HAPUS gmail.com
            value = value.replace(/gmail\.com/g, '')

            setLocalEmail(value)

            if (
              value.includes('@') ||
              value.includes('gmail.com')
            ) {
              setEmailError(
                'Tidak perlu menulis @gmail.com'
              )
            } else {
              setEmailError('')
            }
          }}
          required
        />

        <span className="email-suffix">
          @gmail.com
        </span>

      </div>

      {/* ERROR EMAIL */}
      {emailError && (
        <p className="error-text">
          {emailError}
        </p>
      )}

      {/* PASSWORD */}
      <input
        className="field"
        type="password"
        placeholder="Masukkan password"
        value={password}
        onChange={(event) =>
          setPassword(event.target.value)
        }
        minLength={8}
        required
      />

      {/* CONFIRM PASSWORD */}
      <input
        className="field"
        type="password"
        placeholder="Masukkan ulang password"
        value={confirmPassword}
        onChange={(event) =>
          setConfirmPassword(event.target.value)
        }
        minLength={8}
        required
      />

      {/* ERROR PASSWORD */}
      {password &&
        confirmPassword &&
        password !== confirmPassword && (
          <p className="error-text">
            Password dan konfirmasi password harus sama.
          </p>
      )}

      {/* BUTTON DAFTAR */}
      <button
        className="btn primary full"
        type="submit"
        disabled={
          password !== confirmPassword ||
          !!emailError
        }
      >
        Daftar
      </button>

    </form>
  )
}

export default SignUpPage