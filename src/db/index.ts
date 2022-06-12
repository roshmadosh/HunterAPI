import companyDAO from './dao/companies';
import industryDAO from './dao/industries';
import appUserDAO from './dao/appUsers';

/**
 *  Exporting all DAO methods as a single DB default object to make testing easier.
 */
export default {
  ...companyDAO,
  ...industryDAO,
  ...appUserDAO,
}