import { useState } from 'react'
import { Link } from 'react-router-dom'
import { LOGIN_CHIPS, LOGIN_COPY } from '../../constants/login'
import { validateLogin } from '../../utils/validation'
import './login.css'

function Login({ onLogin }) {
  const [form, setForm] = useState({ email: '', password: '' })
  const [errors, setErrors] = useState({})
  const [message, setMessage] = useState('')

  const handleChange = (field) => (event) => {
    setForm((prev) => ({ ...prev, [field]: event.target.value }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    setMessage('')
    const nextErrors = validateLogin(form)
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length === 0) {
      onLogin(form)
      setMessage(LOGIN_COPY.success)
    }
  }

  return (
    <main className="page-grid">
      <section className="hero">
        <p className="eyebrow">{LOGIN_COPY.eyebrow}</p>
        <h1 className="headline">
          {LOGIN_COPY.titlePrefix}
          <span className="gradient-text">{LOGIN_COPY.titleAccent}</span>
        </h1>
        <p className="subtext">{LOGIN_COPY.subtext}</p>
        <div className="chip-row">
          {LOGIN_CHIPS.map((chip) => (
            <span className="chip" key={chip}>
              {chip}
            </span>
          ))}
        </div>
      </section>

      <section className="card form-card">
        <div className="form-header">
          <div>
            <p className="badge">{LOGIN_COPY.badge}</p>
            <h2 className="form-title">{LOGIN_COPY.formTitle}</h2>
            <p className="form-subtitle">{LOGIN_COPY.formSubtitle}</p>
          </div>
          <Link className="muted-link" to="/signup">
            Need an account?
          </Link>
        </div>

        <form className="form" onSubmit={handleSubmit}>
          <label className="field">
            <span>Email</span>
            <input
              className={errors.email ? 'input error-input' : 'input'}
              type="email"
              placeholder="you@domain.com"
              value={form.email}
              onChange={handleChange('email')}
              required
            />
            {errors.email ? (
              <span className="error">{errors.email}</span>
            ) : (
              <span className="helper">{LOGIN_COPY.helperEmail}</span>
            )}
          </label>

          <label className="field">
            <span>Password</span>
            <input
              className={errors.password ? 'input error-input' : 'input'}
              type="password"
              placeholder="At least 6 characters"
              value={form.password}
              onChange={handleChange('password')}
              required
            />
            {errors.password ? (
              <span className="error">{errors.password}</span>
            ) : (
              <span className="helper">{LOGIN_COPY.helperPassword}</span>
            )}
          </label>

          <div className="actions">
            <button type="submit" className="btn primary">
              {LOGIN_COPY.submitLabel}
            </button>
            <Link className="ghost" to="/signup">
              {LOGIN_COPY.altCta}
            </Link>
          </div>
        </form>

        {message && <p className="success">{message}</p>}
      </section>
    </main>
  )
}

export default Login

