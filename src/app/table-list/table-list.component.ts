import { apiService } from '../appService/api.service';
import { AppDataService } from '../appService/appData.service';
import { Component, OnInit,Output, EventEmitter } from '@angular/core';
import { Table } from './table.model';



@Component({
  selector: 'app-table-list',
  templateUrl: './table-list.component.html',
  styleUrls: ['./table-list.component.css']
})

export class TableListComponent implements OnInit {

  @Output() selectedTable = new EventEmitter<Table>()

  tables: Table[];

  constructor(private appData: AppDataService) {
  }

  ngOnInit(): void {
    this.appData.table.subscribe((tables: Table[]) => {
      this.tables = tables;
    });
  }


  displayTable(table: Table) {
    if (!table.active) {
      table.inTime = new Date();
      table.active = true;
    }
    this.selectedTable.emit(table);
  }
}
