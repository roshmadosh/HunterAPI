export class AppUser {

  constructor(
    private _username: string,
    private _email: string,
    private _password: string,
    private _first_name: string,
    private _last_name: string, 
    private _company_id = 0
  ) {}

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
