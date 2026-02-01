import { Navigate, Outlet, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Signup from './pages/Signup'

const Protected = ({ user }) =>
  user ? <Outlet /> : <Navigate to="/login" replace state={{ from: 'app' }} />

const PublicOnly = ({ user }) =>
  user ? <Navigate to="/" replace state={{ from: 'auth' }} /> : <Outlet />

function AppRoutes({ user, onLogin, onSignup, onSignOut }) {
  return (
    <Routes>
      <Route element={<Protected user={user} />}>
        <Route path="/" element={<Home user={user} onSignOut={onSignOut} />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>

      <Route element={<PublicOnly user={user} />}>
        <Route path="/login" element={<Login onLogin={onLogin} />} />
        <Route path="/signup" element={<Signup onSignup={onSignup} />} />
      </Route>

      <Route path="*" element={<Navigate to={user ? '/' : '/login'} replace />} />
    </Routes>
  )
}

export default AppRoutes

