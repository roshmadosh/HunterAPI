import companyDAO from '../db/companies';
import { Company } from '../models/company'

const getCompanies = () => {
  return companyDAO.getCompanies();
}

const getCompanyById = (company_id: string) => {
  return companyDAO.getCompanyById(company_id);
}

const addCompany = (requestBody: any) => {
  try {
    const company = new Company(requestBody);
    return companyDAO.addCompany(company);
  } catch (err: any) {
    return {
      success: false,
      apiCalled: false,
      message: err.message
    }
  }

}

const updateCompany = (requestObject: any) => {

  // const company = new Company({ company_id, industry_name, company_name });
  // return companyDAO.updateCompany(company);
}

const removeCompany = (company_id: string) => {
  return companyDAO.removeCompany(company_id);
}

export const companyServices = {
  getCompanies,
  getCompanyById,
  addCompany,
  updateCompany,
  removeCompany
}