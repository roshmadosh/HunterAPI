import { stringLength, required, validate } from '../decorators';

export interface ICompany {
  company_id?: string,
  industry_name: string,
  company_name: string
}

export class Company {
  private _company_id: string | undefined;
  
  @validate @required
  private _industry_name: string;
  
  @validate @required @stringLength({ min: 0, max: 30 })
  private _company_name: string;

  constructor({ ...company }: ICompany) {
    this._company_id = company.company_id;
    this._industry_name = company.industry_name;
    this._company_name = company.company_name;
  }

  public get company_id() {
    return this._company_id;
  }
  public get industry_name() {
    return this._industry_name;
  }
  public get company_name() {
    return this._company_name;
  }
}