export class AppUser {
  _username: string;
  _email: string;
  _password: string;
  _first_name: string;
  _last_name: string; 
  _company_id = 0;

  constructor(
    username: string,
    email: string,
    password: string,
    first_name: string,
    last_name: string, 
    company_id?: number
  ) {
    this._username = username;
    this._email = email;
    this._password = password;
    this._first_name = first_name;
    this._last_name = last_name;
    this._company_id = company_id;
  }

  public get username() {
    return this._username;
  }
  public get email() {
    return this._email;
  }
  public get password() {
    return this._password;
  }
  public get first_name() {
    return this._first_name;
  }
  public get last_name() {
    return this._last_name;
  }
  public get company_id() {
    return this._company_id;
  }
}
