import { apiService } from './api.service';
import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';
import { Table } from '../table-list/table.model';

@Injectable({
  providedIn: 'root',
})

export class AppDataService {

  private menuSource = new BehaviorSubject([{}]);
  menu = this.menuSource.asObservable();
  clearCreen = false

  constructor(private api: apiService) { }

  updateAppMenu(menu: any) {
    this.menuSource.next(menu);
  }

  // ====================== //

  private tableSource = new BehaviorSubject([{}]);
  table = this.tableSource.asObservable();

  updateAppTable(table: any) {
    this.tableSource.next(table);
  }

  sendTable(table: Table) {
    this.api.updateTable(table)
  }
}
