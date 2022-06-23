import DAO from '../db';

function LoginServices(database: any) {
  const attemptLogin = (requestBody: { username: string, password: string, rememberMe?: boolean }) => {
    return DAO.attemptLogin(requestBody);
  }
  return {
    attemptLogin,
  }
}

export default LoginServices;