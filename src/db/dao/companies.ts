import { runQuery, ReturnObject } from '../setup';
import { Company, ICompany } from '../../models/company';

const getCompanies = async (): Promise<ReturnObject<Company>> => {
  const result = await runQuery({ text: 'SELECT * FROM company' });
  if (result.success) {
    return {
      ...result,
      data: result.data.map((company: ICompany) => new Company(company)),
    };
  } return result;
}

const getCompanyById = async (company_id:string): Promise<ReturnObject<Company>> => {
  const result = await runQuery({
    text: 'SELECT * FROM company WHERE company_id = $1',
    values: [company_id]
  });
  if (result.data?.length > 0) {
    return {
      ...result,
      data: result.data.map((company: ICompany) => new Company(company)),
    }
  } return {
    success: false,
    apiCalled: true,
    message: result.message || 'company_id not found.'
  }
}

const addCompany = async (company: ICompany): Promise<ReturnObject<Company>> => {
  const exists = await checkExists(company);
  if(!exists.success) {
    return exists;
  }
  const result = await runQuery({ 
    text: 'INSERT INTO company(industry_name, company_name) VALUES($1, $2) RETURNING *',
    values: [company.industry_name, company.company_name]
  });
  const data = result.success ? new Company(result.data[0]) : undefined;
  return {
    ...result,
    data,
  }
}

const updateCompany = async (company: ICompany): Promise<ReturnObject<Company>> => {
  const { industry_name, company_name, company_id } = company;
  const exists = await checkExists(company);
  if(!exists.success) {
    return {
      ...exists,
      message: `Company name ${company_name} already taken for industry ${industry_name}`
    }
  }

  const result = await runQuery({
    text: 'UPDATE company SET industry_name = $1, company_name = $2 WHERE company_id = $3 RETURNING *',
    values: [industry_name, company_name, company_id!] // validation occurs at the object-mapping level, i.e. company_id will always be non-null
  });

  if (result.data?.length > 0) {
    return result;
  } 
  return {
    success: false,
    apiCalled: true,
    message: result.message || 'company_id not found.'
  }
}

const removeCompany = async (company_id: string): Promise<ReturnObject<Company>> => {
  const result = await runQuery({
    text: 'DELETE FROM company WHERE company_id = $1 RETURNING *',
    values: [company_id]
  });

  if (result.data?.length > 0) {
    return result;
  } 
  return {
    success: false,
    apiCalled: true,
    message: result.message || 'company_id not found.'
  }
}

const checkExists= async (company: ICompany): Promise<ReturnObject<Company>> => {
  const { industry_name, company_name } = company;
  const duplicate = await runQuery({
    text: 'SELECT * FROM company WHERE industry_name = $1 AND company_name = $2',
    values: [industry_name, company_name]
  });
  if (duplicate.data[0]) {
    return {
      success: false,
      apiCalled: true,
      message: 'Company already exists'
    }
  } else {
    return {
      success: true,
      apiCalled: true
    }
  }
}

export default {
  getCompanies,
  getCompanyById,
  addCompany,
  updateCompany,
  removeCompany
}