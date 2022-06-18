import DAO from '../db';
import { AppUser, IAppUser } from '../models/appUser';

function AppUserServices(database: any) {
  const getAllUsers = () => {
    return DAO.getAllUsers();
  }

  const getAppUserByUsername = (requestQueryParams: { username: string }) => {
    const { username } = requestQueryParams;
    return DAO.getAppUserByIdentifier({ column: 'username', value: username});
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
      // find user
      const queriedUser = await getAppUserByUsername({ username: requestObject.username });
      if (!queriedUser.data.length) {
        return {
          ...queriedUser,
          success: false,
        }
      }
      // create an AppUser instance with updated details
      const updatedUser = new AppUser({
        ...queriedUser.data[0],
        email: requestObject.email,
        first_name: requestObject.first_name,
        last_name: requestObject.last_name,
      });

      return DAO.updateAppUser(updatedUser);
    } catch (err: any) { // this will catch any validation errors from AppUser instantiation
      return {
        success: false,
        apiCalled: true,
        message: err.message
      }
    }
  }

  const removeAppUser = (username: string) => {
    return DAO.removeAppUser(username);
  }

  
  return {
    getAllUsers,
    getAppUserByUsername,
    addAppUser,
    updateAppUser,
    removeAppUser
  }
}

export default AppUserServices;