import { Receipt } from './../cart/Receipt.model';
import { MenuItem } from '../menu/menu-item/menu-item.model';
import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Table } from '../table-list/table.model';
import { delay } from 'rxjs/operators';

const URL = 'https://api.lauvit117.com/';

@Injectable()
export class apiService {

  constructor(private http: HttpClient) {

  }

  GetMenu() {
    return this.http.get(URL + 'menu').toPromise();
  }

  UpdateMenu(menu: MenuItem[]) {
    this.http.post(URL + 'menu',menu).subscribe();
  }

  GetTables() {
    return this.http.get(URL + 'tables').toPromise();
  }

  updateTable(table: Table) {
    this.http.patch(URL + 'tables',table).subscribe();
  }

  GetStaticVal() {
    return this.http.get(URL + 'staticVal').toPromise();
  }

  UpdateStaticVal(staticVal: any) {
    this.http.post(URL + 'staticVal', staticVal).subscribe();
  }

  saveReceipt(receipt: Receipt) {
    this.http.post(URL + 'receipt',receipt).subscribe();
  }
}
