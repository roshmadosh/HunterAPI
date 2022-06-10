import { required } from '../decorators';

export interface IIndustry {
  industry_name: string,
}
export class Industry {
  @required
  private _industry_name: string;

  constructor({ industry_name }: IIndustry){
    this._industry_name = industry_name;
  }

  public get industry_name() {
    return this._industry_name;
  } 
}