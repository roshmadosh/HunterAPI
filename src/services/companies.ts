import DAO from '../db';
import { Company, ICompany } from '../models/company'

function companyServices(database: any) {
  const getCompanies = () => {
    return database.getCompanies();
  }
  
  const getCompanyById = (company_id: string) => {
    return database.getCompanyById(company_id);
  }
  
  const addCompany = (requestBody: ICompany) => {
    try {
      const company = new Company(requestBody);
      return database.addCompany(company);
    } catch (err: any) {
      return {
        success: false,
        apiCalled: false,
        message: err.message
      }
    }
  }
  
  const updateCompany = (requestObject: ICompany) => {
    try {
      const company = new Company(requestObject);
      return database.updateCompany(company);
    } catch (err: any) {
      return {
        success: false,
        apiCalled: false,
        message: err.message
      }
    }
  }
  
  const removeCompany = (company_id: string) => {
    return DAO.removeCompany(company_id);
  }

  return {
    getCompanies,
    getCompanyById,
    addCompany,
    updateCompany,
    removeCompany
  }
}


export default companyServices;