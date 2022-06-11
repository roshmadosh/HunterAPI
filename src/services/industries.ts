import DAO from '../db';

function industryServices(database: any) {
  const getIndustries = async () => {
    return DAO.getIndustries();
  }
  
  const addIndustry = (industry_name: string) => {
    // validate parameter
    // ....
    
    return DAO.addIndustry(industry_name);
  }

  return {
    getIndustries,
    addIndustry
  }
}


export default industryServices;