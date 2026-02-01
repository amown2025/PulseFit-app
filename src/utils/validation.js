import { MIN_PASSWORD_LENGTH } from '../constants'

const emailRegex = /\S+@\S+\.\S+/

export const isValidEmail = (email) => emailRegex.test(email)

export const validateLogin = ({ email, password }) => {
  const errors = {}
  if (!isValidEmail(email)) errors.email = 'Enter a valid email'
  if (!password || password.length < MIN_PASSWORD_LENGTH) {
    errors.password = `Password should be at least ${MIN_PASSWORD_LENGTH} characters`
  }
  return errors
}

export const validateSignup = ({ name, email, password, confirm }) => {
  const errors = {}
  if (!name?.trim()) errors.name = 'Tell us your name'
  if (!isValidEmail(email)) errors.email = 'Enter a valid email'
  if (!password || password.length < MIN_PASSWORD_LENGTH) {
    errors.password = `Password should be at least ${MIN_PASSWORD_LENGTH} characters`
  }
  if (password !== confirm) errors.confirm = 'Passwords must match'
  return errors
}

