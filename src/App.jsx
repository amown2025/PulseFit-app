import { useEffect, useState } from 'react'
import AppRoutes from './router'
import { DEFAULT_NEW_USER_NAME } from './constants'
import { clearUser, loadUser, persistUser } from './utils/storage'
import './styles/layout.css'

function App() {
  const [user, setUser] = useState(() => loadUser())

  useEffect(() => {
    if (user) {
      persistUser(user)
    } else {
      clearUser()
    }
  }, [user])

  const handleLogin = ({ email }) => {
    const local = email?.split('@')[0] || DEFAULT_NEW_USER_NAME
    setUser({ name: local, email })
  }

  const handleSignup = ({ name, email }) => {
    setUser({ name: name || DEFAULT_NEW_USER_NAME, email })
  }

  const handleSignOut = () => setUser(null)

  return (
    <div className="app-shell">
      <div className="content">
        <header className="topbar">
          <div className="brand">
            <span className="brand-mark">◎</span>
            <div>
              <p className="brand-name">PulseFit</p>
              <p className="brand-sub">Train • Track • Improve</p>
            </div>
          </div>
          {user ? (
            <button className="ghost" onClick={handleSignOut}>
              Sign out
            </button>
          ) : (
            <span className="pill">Gym mode • Live</span>
          )}
        </header>

        <AppRoutes
          user={user}
          onLogin={handleLogin}
          onSignup={handleSignup}
          onSignOut={handleSignOut}
        />
      </div>
    </div>
  )
}

export default App
