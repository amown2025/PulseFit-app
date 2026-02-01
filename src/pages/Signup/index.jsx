import { useState } from 'react'
import { Link } from 'react-router-dom'
import { SIGNUP_CHIPS, SIGNUP_COPY } from '../../constants/signup'
import { validateSignup } from '../../utils/validation'
import './signup.css'

function Signup({ onSignup }) {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    confirm: '',
  })
  const [errors, setErrors] = useState({})
  const [message, setMessage] = useState('')

  const handleChange = (field) => (event) => {
    setForm((prev) => ({ ...prev, [field]: event.target.value }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    setMessage('')
    const nextErrors = validateSignup(form)
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length === 0) {
      onSignup({ name: form.name, email: form.email })
      setMessage('Account created. Taking you to your new home.')
    }
  }

  return (
    <main className="page-grid">
      <section className="hero">
        <p className="eyebrow">{SIGNUP_COPY.eyebrow}</p>
        <h1 className="headline">
          {SIGNUP_COPY.titlePrefix}
          <span className="gradient-text">{SIGNUP_COPY.titleAccent}</span>
        </h1>
        <p className="subtext">{SIGNUP_COPY.subtext}</p>
        <div className="chip-row">
          {SIGNUP_CHIPS.map((chip) => (
            <span className="chip" key={chip}>
              {chip}
            </span>
          ))}
        </div>
      </section>

      <section className="card form-card">
        <div className="form-header">
          <div>
            <p className="badge">{SIGNUP_COPY.badge}</p>
            <h2 className="form-title">{SIGNUP_COPY.formTitle}</h2>
            <p className="form-subtitle">{SIGNUP_COPY.formSubtitle}</p>
          </div>
          <Link className="muted-link" to="/login">
            Have an account?
          </Link>
        </div>

        <form className="form" onSubmit={handleSubmit}>
          <label className="field">
            <span>Full name</span>
            <input
              className={errors.name ? 'input error-input' : 'input'}
              type="text"
              placeholder="Ava Williams"
              value={form.name}
              onChange={handleChange('name')}
              required
            />
            {errors.name && <span className="error">{errors.name}</span>}
          </label>

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
              <span className="helper">{SIGNUP_COPY.helperEmail}</span>
            )}
          </label>

          <div className="double">
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
              {errors.password && <span className="error">{errors.password}</span>}
            </label>

            <label className="field">
              <span>Confirm</span>
              <input
                className={errors.confirm ? 'input error-input' : 'input'}
                type="password"
                placeholder="Repeat password"
                value={form.confirm}
                onChange={handleChange('confirm')}
                required
              />
              {errors.confirm && <span className="error">{errors.confirm}</span>}
            </label>
          </div>

          <div className="actions">
            <button type="submit" className="btn primary">
              {SIGNUP_COPY.submitLabel}
            </button>
            <Link className="ghost" to="/login">
              {SIGNUP_COPY.altCta}
            </Link>
          </div>
        </form>

        {message && <p className="success">{message}</p>}
      </section>
    </main>
  )
}

export default Signup

