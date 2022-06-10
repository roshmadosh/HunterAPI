import industryDAO from '../db/industries';

const getIndustries = async () => {
  return industryDAO.getIndustries();
}

const addIndustry = (industry_name: string) => {
  // validate parameter
  // ....
  
  return industryDAO.addIndustry(industry_name);
}

export const industryServices = {
  getIndustries,
  addIndustry
}
