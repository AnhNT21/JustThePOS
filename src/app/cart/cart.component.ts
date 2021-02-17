import { Receipt } from './Receipt.model';
import { apiService } from './../appService/api.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AppDataService } from '../appService/appData.service';
import { MenuItem } from './../menu/menu-item/menu-item.model';
import { CartItem } from './cart-item/cartItem.model';
import { Table } from '../table-list/table.model';

import { Component, OnInit, Input, ViewChild, ElementRef, Inject } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { MatAutocomplete } from '@angular/material/autocomplete';


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})

export class CartComponent implements OnInit {

  @Input() table: Table;

  @ViewChild('newItemName') newName: ElementRef;
  @ViewChild('newItemQuantity') newQuantity: ElementRef;
  @ViewChild('newItemPrice') newPrice: ElementRef;

  @ViewChild(MatAutocomplete) matAutocomplete: MatAutocomplete;


  myControl = new FormControl();
  options: any[];

  filteredOptions: Observable<string[]>;

  constructor(
    private appData: AppDataService,
    private api: apiService,
    public dialog: MatDialog) {

  }

  ngOnInit(): void {
    this.appData.menu.subscribe((menu: MenuItem[]) => {
      this.options = menu;
    })

    this.filteredOptions = this.myControl.valueChanges
    .pipe(
      startWith(''),
      map((value) => this._filter(value))
    );
  }

  private _filter(value: string): string[] {
    const exceptChar = ['[',']','{','}','|',':','/']
    for (let i = 0; i < exceptChar.length; i++) {
      if (value == exceptChar[i]) {
        return [];
      }
    }
    return this.options.filter((option) => new RegExp(value, 'gi').test(option.shortcut));
  }

  updateTotal() {
    this.table.updateGrand();
    this.appData.sendTable(this.table);
  }

  deleteItem(itemToDelete: CartItem) {
    this.table.orderedItems = this.table.orderedItems.filter((item) => item !== itemToDelete)
    this.table.updateGrand();
    this.appData.sendTable(this.table);
  }

  addItem(item) {
    const quantity = parseInt(this.newQuantity.nativeElement.value);

    for (let i = 0; i < this.table.orderedItems.length; i++) {
      if (item.name == this.table.orderedItems[i].itemName) {
        this.table.orderedItems[i].quantity = this.table.orderedItems[i].quantity + quantity;
        this.table.orderedItems[i].calcCost();
        this.table.updateGrand();
        this.appData.sendTable(this.table);
        return;
      }
    }

    this.table.orderedItems.push(new CartItem(item.name, quantity, item.price));
    this.table.updateGrand();
    this.appData.sendTable(this.table);
  }

  addNew() {

    const quantField = this.newQuantity.nativeElement.value;
    const priceField = this.newPrice.nativeElement.value;

    for (let i = 0; i < this.table.orderedItems.length; i++) {
      if (this.newName.nativeElement.value == this.table.orderedItems[i].itemName) {
        this.table.orderedItems[i].quantity++;
        this.table.orderedItems[i].calcCost();
        this.table.updateGrand();
        this.appData.sendTable(this.table);
        this.newName.nativeElement.value = '';
        this.newPrice.nativeElement.value = '';
        return;
      }
    }

    if (!isNaN(quantField) && !isNaN(priceField)) {
      let newItem = new CartItem(
        this.newName.nativeElement.value,
        this.newQuantity.nativeElement.value,
        this.newPrice.nativeElement.value
      );

      this.table.orderedItems.push(newItem);
      this.table.updateGrand();
      this.appData.sendTable(this.table);
    }

    this.newName.nativeElement.value = '';
    // this.newQuantity.nativeElement.value = '';
    this.newPrice.nativeElement.value = '';
  }

  subQuantity() {
    const quantityField = this.newQuantity.nativeElement.value;

    if (!(quantityField < 2)) {
      this.table.lastQuant--;
      this.newQuantity.nativeElement.value--;
    }
  }

  quantityChange() {
    if (!isNaN(this.newQuantity.nativeElement.value)) {
      this.table.lastQuant = this.newQuantity.nativeElement.value;
      this.appData.sendTable(this.table);
    }

  }

  addQuantity() {
    this.table.lastQuant++
    this.newQuantity.nativeElement.value++;
  }

  displayFn(item): string {
    // return item ? item.name : item;
    return '';
  }

  closeTable() {
    this.table.clear();
    this.appData.sendTable(this.table);
  }

  receiptNo: number = 0;
  pay() {

    if (this.table.active && this.table.paid) {

      this.api.UpdateStaticVal({lastedReceiptNo: this.receiptNo})
      this.api.saveReceipt(new Receipt(this.receiptNo, this.table));

      this.table.clear();
      this.appData.sendTable(this.table);

    } else {

      this.api.GetStaticVal().then((res) => {
        console.log(res[0].lastedReceiptNo);
        this.receiptNo = res[0].lastedReceiptNo + 1;

        this.table.outTime = new Date();
        this.table.paid = true;
      });

      setTimeout(() => {
        printBill();
      }, 100);

    }
  }
}



























function printBill() {
  let printContents, popupWin;
  printContents = document.getElementById('printTemplate').innerHTML;
  // printContents = '<h1>Test</h1>';

  popupWin = window.open('', '_blank', 'top=0,left=0,height=820px,width=auto');
  popupWin.document.open();
  popupWin.document.write(`
    <html>
      <head>
        <title>Print tab</title>
        <style>
          body {
            margin: 0;
          }

          .container {
              position: relative;
              width: 559px;
              min-height: 794px;
              /*margin: 0 auto;*/
              margin: 0;
              border: 1px solid;
          }

          .brand {
              /* background-color: green; */
              width: 45%;
              padding: 10px;
              display: inline-block;

          }
          .contact {
              text-align: right;
              vertical-align: top;
              width: 45%;
              padding: 20px 10px;
              display: inline-block;
          }

          .brand h3 {
              margin: 10px auto;
              text-align: center;
          }

          p {
              margin: 0 10px;
          }

          h2 {
              text-align: center;
              margin: 0;
          }

          .inOutTime {
              float: left;
              width: 60%;
              padding: 10px;
          }

          .inOutTime p {
              width: 35%;
              margin-top: 5px;
              float: left;
          }

          .tableNumb {
              width: 30%;
              padding: 10px;
              height: 46.8px;
              float: left;
          }

          .tableNumb h2 {
              margin: 0;
              display: inline-block;
              transform: translateY(50%);
          }

          table {
              width:520px;
              border: 1px solid;
              margin: 10px auto;
          }

          table, th {
              border: 2px solid;
              border-collapse: collapse;
              padding: 0 10px;
              height: 25px;
          }

          table tr {
              height: 25px;
          }

          table td {
              border: 1px solid;
              border-collapse: collapse;
              padding: 0 10px;
          }

          .right {
              text-align: right;
          }
          .center {
              text-align: center;
          }

          .billNo {
              position: absolute;
              width: 93%;
              font-size: 12px;
              padding: 0 10px;
              text-align: right;
              font-family: Arial, Helvetica, sans-serif;
              bottom: 20px;
              right: 5px;
          }

        </style>
      </head>
    <body onload="window.print();" onClick="window.close()">${printContents}</body>
    </html>`
  );
  popupWin.document.close();
}
