export class UserEntity {
  private _id: number;
  private _login: string;
  private _description: string;
  private _password: string;
  // private _description: string;
  // private _role: string;

  constructor() {}

  get id(): number {
    return this._id;
  }

  set id(value: number) {
    this._id = value;
  }

  set login(value: string) {
    this._login = value;
  }

  get login(): string {
    return this._login;
  }

  set description(value: string) {
    this._description = value;
  }

  get description(): string {
    return this._description;
  }

  set password(value: string) {
    this._password = value;
  }

  get password(): string {
    return this._password;
  }
}
