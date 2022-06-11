import companyDAO from './dao/companies';
import industryDAO from './dao/industries';

/**
 *  Exporting all DAO methods as a single DB default object to make testing easier.
 */
export default {
  ...companyDAO,
  ...industryDAO,
}