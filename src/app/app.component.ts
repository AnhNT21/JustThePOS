import { CartItem } from './cart/cart-item/cartItem.model';
import { Table } from './table-list/table.model';
import { Component, OnInit } from '@angular/core';
import { AppDataService } from './appService/appData.service';
import { apiService } from "./appService/api.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'Lẩu Vịt 117';

  selectedTable: Table

  data_loaded = false;

  constructor(
    private appData: AppDataService,
    private api: apiService) {

  }

  ngOnInit() {
    this.api.GetMenu().then((menu: Response) => {
      this.appData.updateAppMenu(menu)
    })

    this.api.GetTables().then((tableRawObj: Table[]) => {
      let tables = tableRawObj.map(x => Object.assign(new Table(x.tableNumber,x.orderedItems,x.active),x))
      for (let i = 0; i < tables.length; i++) {
        tables[i].orderedItems = tables[i].orderedItems.map(x => Object.assign(new CartItem(x.itemName, x.quantity, x.price),x))
      }
      tables.sort();
      this.appData.updateAppTable(tables)
      this.data_loaded = true;
    })

  }

}
