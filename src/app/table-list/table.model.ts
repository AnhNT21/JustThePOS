import { CartItem } from '../cart/cart-item/cartItem.model';

export class Table {
  tableNumber: string;
  active: boolean;
  paid: boolean;
  orderedItems: CartItem[];
  grandTotal: number;
  lastQuant: number;
  inTime: Date;
  outTime: Date;

  constructor(tableNumber: string, orderedItems: CartItem[], active: boolean) {
    this.tableNumber = tableNumber;
    this.active = active;
    this.paid = false;
    this.orderedItems = orderedItems;
    this.updateGrand();
    this.lastQuant = 1;
  }

  updateGrand() {
    let total: number = 0;
    for (let i = 0; i < this.orderedItems.length; i++) {
      let tmp = this.orderedItems[i].cost;
      total += tmp;
    }
    this.grandTotal = total;
  }

  clear() {
    this.active = false;
    this.paid = false;
    this.orderedItems = [];
    this.grandTotal = 0;
    // this.inTime
  }
}
