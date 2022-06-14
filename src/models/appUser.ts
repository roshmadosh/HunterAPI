import { validateClass, validate, required, stringLength } from "../decorators";

export interface IAppUser {
  username: string,
  email: string,
  password: string,
  first_name: string,
  last_name: string,
  company_id?: string;
}

@validateClass
export class AppUser implements IAppUser {
  @validate @required @stringLength({ min: 0, max: 30 })
  username: string;

  @validate @required @stringLength({ min: 0, max: 254 })
  email: string;

  @validate @required @stringLength({ min: 0, max: 72 })
  password: string;

  @validate @required @stringLength({ min: 0, max: 30 })
  first_name: string;

  @validate @required @stringLength({ min: 0, max: 30 })
  last_name: string;

  company_id: string | undefined;

  constructor({ ...appUser }: IAppUser) {
    this.username = appUser.username;
    this. email = appUser.email;
    this.password = appUser.password;
    this.first_name = appUser.first_name;
    this.last_name = appUser.last_name;
    this.company_id = appUser.company_id
  }
}
