import { stringLength, required, validate } from '../decorators';
import { validateClass } from '../decorators/validateClass';


export interface ICompany {
  company_id?: string,
  industry_name: string,
  company_name: string
};

@validateClass
export class Company implements ICompany{
  company_id: string | undefined;
  
  @validate @required
  industry_name: string;
  
  @validate @required @stringLength({ min: 0, max: 30 })
  company_name: string;

  constructor({ ...company }: ICompany) {
    this.company_id = company.company_id;
    this.industry_name = company.industry_name;
    this.company_name = company.company_name;
  }
}