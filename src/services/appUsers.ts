import DAO from '../db';
import { AppUser, IAppUser } from '../models/appUser';

function AppUserServices(database: any) {
  const getAllUsers = () => {
    return DAO.getAllUsers();
  }

  const addAppUser = (requestBody: any) => {
    try {
      const appUser = new AppUser(requestBody);
      return DAO.addAppUser(appUser);
    } catch (err: any) {
      return {
        success: false,
        apiCalled: false,
        message: err.message
      }
    }
  }
  return {
    getAllUsers,
    addAppUser
  }
}

export default AppUserServices;