export class ProductEntity {
  private _id: number;
  private _title: string;
  private _description: string;
  private _price: string;
  // private _description: string;
  // private _role: string;

  constructor() {}

  get id(): number {
    return this._id;
  }

  set id(value: number) {
    this._id = value;
  }

  set title(value: string) {
    this._title = value;
  }

  get title(): string {
    return this._title;
  }

  set description(value: string) {
    this._description = value;
  }

  get description(): string {
    return this._description;
  }

  set price(value: string) {
    this._price = value;
  }

  get price(): string {
    return this._price;
  }
}
