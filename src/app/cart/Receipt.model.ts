import { Table } from '../table-list/table.model';
import { CartItem } from './cart-item/cartItem.model';

export class Receipt {
  receiptNo: number;
  createdOn: Date;
  inTime: Date;
  outTime: Date;
  tableNumber: string;
  grandTotal: number;
  orderedItems: CartItem[];

  constructor(receiptNo: number, table: Table) {
    this.receiptNo = receiptNo;
    this.createdOn = table.outTime;
    this.inTime = table.inTime;
    this.outTime = table.outTime;
    this.tableNumber = table.tableNumber;
    this.grandTotal = table.grandTotal;
    this.orderedItems = table.orderedItems
  }
}
