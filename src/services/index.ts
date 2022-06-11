import companyServices  from './companies';
import industryServices from './industries';

module.exports = function useDatabase(database: any) {
  return {
    ...companyServices(database),
    ...industryServices(database),
  }
}