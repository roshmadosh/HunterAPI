import companyDAO from './dao/companies';
import industryDAO from './dao/industries';
import appUserDAO from './dao/appUsers';
import loginDAO from './dao/login';

/**
 *  Exporting all DAO methods as a single DB default object to make testing easier.
 */
export default {
  ...companyDAO,
  ...industryDAO,
  ...appUserDAO,
  ...loginDAO,
}