import { request } from 'http';
import DAO from '../db';
import { AppUser, IAppUser } from '../models/appUser';
import { capitalizeFirstLetters } from '../utils/capitalizeFirst';

function AppUserServices(database: any) {
  const getAllUsers = () => {
    return DAO.getAllUsers();
  }

  const getAppUserByUsername = (requestQueryParams: { username: string }) => {
    const { username } = requestQueryParams;
    return DAO.getAppUserByIdentifier({ column: 'username', value: username});
  }

  const getAppUserByEmail = (requestBody: { email: string}) => {
    return DAO.getAppUserByIdentifier({ column: 'email', value: requestBody.email });
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

  const updateAppUser = async (requestObject: { username: string, email: string, first_name: string, last_name: string}) => {
    try {
      const queriedUser = await getAppUserByUsername({ username: requestObject.username });
      if (!queriedUser.data.length) {
        return {
          ...queriedUser,
          success: false,
        }
      }
      const updatedUser = new AppUser({
        ...queriedUser.data[0],
        email: requestObject.email,
        first_name: requestObject.first_name,
        last_name: requestObject.last_name,
      });
      return DAO.updateAppUser(updatedUser);
    } catch (err: any) {
      return {
        success: false,
        apiCalled: true,
        message: err.message
      }
    }
  }
  
  return {
    getAllUsers,
    getAppUserByUsername,
    addAppUser,
    updateAppUser,
  }
}

export default AppUserServices;