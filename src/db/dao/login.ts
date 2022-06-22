import { runQuery, ReturnObject } from '../setup';
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const attemptLogin = async (credentials: { username: string, password: string }) => {
  if (!credentials.username || !credentials.password) {
    return {
      success: false,
      apiCalled: false,
      message: 'Please provide a username and password.'
    }
  }
  const result = await runQuery({
    text: `SELECT * FROM appuser WHERE username = $1`,
    values: [credentials.username],
  })
  if (result.data.length === 0) {
    return {
      success: false,
      apiCalled: true,
      message: 'Username not found.'
    }
  }
  const hashedPassword = result.data[0].password;
  const match = await bcrypt.compare(credentials.password, hashedPassword);

  if (match) {
    const token = jwt.sign(
      { username: credentials.username }, 
      process.env.JWT_SECRET, 
      {
        expiresIn: process.env.JWT_EXPIRES_IN
      });
    return {
      success: true,
      apiCalled: true,
      token
    }
  } else {
    return {
      success: false,
      apiCalled: true,
      message: 'Password incorrect.'
    }
  }
}

const validatePassword = (plainTextPassword: string, hashedPassword: string) => {
  const match = bcrypt.compare(plainTextPassword, hashedPassword);
  if (!match) {
    throw new Error('Incorrect password.');
  } return {
    success: true,
    apiCalled: true
  }
}
export default {
  attemptLogin,
  validatePassword,
}