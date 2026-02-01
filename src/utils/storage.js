import { STORAGE_KEY } from '../constants'

export const loadUser = () => {
  const raw = localStorage.getItem(STORAGE_KEY)
  if (!raw) return null
  try {
    return JSON.parse(raw)
  } catch (error) {
    console.error('Failed to parse stored user', error)
    return null
  }
}

export const persistUser = (user) => {
  if (!user) return
  localStorage.setItem(STORAGE_KEY, JSON.stringify(user))
}

export const clearUser = () => {
  localStorage.removeItem(STORAGE_KEY)
}

