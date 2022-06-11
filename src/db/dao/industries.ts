import { runQuery, ReturnObject } from "../setup";
import { Industry, IIndustry } from "../../models/industry";

const getIndustries = async (): Promise<ReturnObject<Industry>> => {
  const result = await runQuery({ text: 'SELECT * FROM industry' });
  if (!result.success) {
    return result;
  }
  return {
    ...result,
    data: result.data.map((industry: IIndustry) => new Industry(industry)),
  }
};

const addIndustry = (industry_name: string): Promise<ReturnObject<Industry>>=> {
  return runQuery({
    text: 'INSERT INTO industry(industry_name) VALUES($1)',
    values: [industry_name]
  });
};

export default {
  getIndustries,
  addIndustry
}