export class MenuItem {

  name: string
  price: number
  shortcut: string

  constructor(name: string, price: number, shortcut: string) {
    this.name = name
    this.price = price
    this.shortcut = shortcut;
  }
}
