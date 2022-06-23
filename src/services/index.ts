import companyServices  from './companies';
import industryServices from './industries';
import appUserServices from './appUsers';
import loginServices from './login';

module.exports = function useDatabase(database?: any) {
  return {
    ...companyServices(database),
    ...industryServices(database),
    ...appUserServices(database),
    ...loginServices(database),
  }
}