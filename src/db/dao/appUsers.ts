import { runQuery, ReturnObject } from '../setup';
import { AppUser, IAppUser } from '../../models/appUser';


const getAllUsers = async () => {
  const result = await runQuery({ text: 'GET * FROM appuser'});
  if (result.success) {
    return {
      ...result,
      data: result.data.map((user: IAppUser) => new AppUser(user))
    }
  } return result;
}

const addAppUser = async (appUser: IAppUser): Promise<ReturnObject<AppUser>> => {
  const exists = await checkExists(appUser);
  if(!exists.success) {
    return exists;
  }
  const { username, email, password, first_name, last_name } = appUser;
  const result = await runQuery({ 
    text: `INSERT INTO appUser(username, email, password, first_name, last_name${appUser.company_id ? ', company_id' : ''}) VALUES($1, $2, $3, $4, $5${appUser.company_id ? ', $6' : ''}) RETURNING *`,
    values: [username, email, password, first_name, last_name].concat(appUser.company_id ? [appUser.company_id] : [])
  });
  const data = result.success ? new AppUser(result.data[0]) : undefined;
  return {
    ...result,
    data,
  }
}
const checkExists= async (appUser: IAppUser): Promise<ReturnObject<AppUser>> => {
  const { username } = appUser;
  const duplicate = await runQuery({
    text: 'SELECT * FROM appUser WHERE username = $1',
    values: [username]
  });
  if (duplicate.data[0]) {
    return {
      success: false,
      apiCalled: true,
      message: 'Username already taken.'
    }
  } else {
    return {
      success: true,
      apiCalled: true
    }
  }
}

export default {
  getAllUsers,
  addAppUser,

}