import { runQuery, ReturnObject } from '../setup';
import { AppUser, IAppUser } from '../../models/appUser';
const bcrypt = require('bcrypt');


const getAllUsers = async () => {
  const result = await runQuery({ text: 'SELECT * FROM appuser'});
  if (result.success) {
    return {
      ...result,
      data: result.data.map((user: IAppUser) => new AppUser(user))
    }
  } return result;
}
type identifier = 'username' | 'email';
const getAppUserByIdentifier = async (data: { column: identifier, value: string  }) => {
  const result = await runQuery({ 
    text: `SELECT * FROM appuser WHERE ${data.column}=$1`, 
    values: [data.value]
  });
  if (result.data?.length > 0) {
    return {
      ...result,
      data: result.data.map((appUser: IAppUser) => new AppUser(appUser)),
    }
  } return {
    success: false,
    apiCalled: true,
    message: result.message || `${data.column} not found.`,
    data: []
  }
}

const addAppUser = async (appUser: IAppUser): Promise<ReturnObject<AppUser>> => {
  const { username, email, password, first_name, last_name } = appUser;
  const hash = generateHash(password, 10);
  const result = await runQuery({ 
    text: `INSERT INTO appUser(username, email, password, first_name, last_name${appUser.company_id ? ', company_id' : ''}) VALUES($1, $2, $3, $4, $5${appUser.company_id ? ', $6' : ''}) RETURNING *`,
    values: [username, email, hash, first_name, last_name].concat(appUser.company_id ? [appUser.company_id] : [])
  });
  const data = result.success ? new AppUser(result.data[0]) : undefined;
  return {
    ...result,
    data,
  }
}

const updateAppUser = async (appUser: IAppUser): Promise<ReturnObject<AppUser>> => {
  const { username, email, first_name, last_name } = appUser;
  const result = await runQuery({
    text: `UPDATE appUser SET email = $1, first_name = $2, last_name = $3 WHERE username = $4 RETURNING *`,
    values: [email, first_name, last_name, username]
  })
  const data = result.success ? new AppUser(result.data[0]) : undefined;
  return {
    ...result,
    data,
  }
}

const checkExists= async (appUser: IAppUser): Promise<ReturnObject<AppUser>> => {
  const { email } = appUser;
  const duplicate = await runQuery({
    text: 'SELECT * FROM appUser WHERE email = $1',
    values: [email]
  });
  if (duplicate.data[0]) {
    return {
      success: false,
      apiCalled: true,
      message: 'An account with that email already exists.'
    }
  } else {
    return {
      success: true,
      apiCalled: true
    }
  }
}

const generateHash = (plainTextPassword: string, saltRounds: number) => {
  return bcrypt.hashSync(plainTextPassword, saltRounds);
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
  getAllUsers,
  getAppUserByIdentifier,
  addAppUser,
  validatePassword,
  updateAppUser,
}