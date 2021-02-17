export class CartItem {
  itemName: string
  quantity: number
  price: number
  cost

  constructor(itemName: string, quantity: number, price: number) {
    this.itemName = itemName
    this.price = price ? price : 0
    this.quantity = quantity
    this.cost = price * quantity

  }

  calcCost() {
    this.cost = this.price * this.quantity
    // console.log(this.cost)
  }
}
