import companyServices  from './companies';
import industryServices from './industries';
import appUserServices from './appUsers';

module.exports = function useDatabase(database: any) {
  return {
    ...companyServices(database),
    ...industryServices(database),
    ...appUserServices(database),
  }
}