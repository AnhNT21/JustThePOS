import { AppDataService } from '../appService/appData.service';
import { MenuItem } from './menu-item/menu-item.model';
import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { apiService } from '../appService/api.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
})

export class MenuComponent implements OnInit {

  menu: MenuItem[];

  @ViewChild('nameInput') nameField: ElementRef
  @ViewChild('priceInput') priceField: ElementRef
  @ViewChild('shortcutInput') shortcutField: ElementRef


  itemsToUpdate: MenuItem[] = [];

  constructor(
    private appData: AppDataService,
    private MenuDB: apiService) {

  }

  ngOnInit() {
    this.appData.menu.subscribe((menu: MenuItem[]) => {
      this.menu = menu;
    });
  }


  addNewItem() {
    let newItemName = this.nameField.nativeElement.value;
    let newItemPrice = this.priceField.nativeElement.value;
    let newItemShortcut = this.shortcutField.nativeElement.value;

    for (let i = 0; i < this.menu.length; i++) {
      if (this.menu[i].name == newItemName) {
        return;
      }
    }
    this.menu.push(
      new MenuItem(newItemName, newItemPrice, newItemShortcut)
    )
  }

  addToUpdateList(editedItem: MenuItem) {
    this.itemsToUpdate.push(editedItem);
  }

  addToDeleteList(itemToDelete: MenuItem) {
    this.menu = this.menu.filter(item => item.name != itemToDelete.name);
  }

  saveChange() {
    for (let i = 0; i < this.itemsToUpdate.length; i++) {
      for (let j = 0; j < this.menu.length; j++) {
        if (this.itemsToUpdate[i].name == this.menu[j].name) {
          this.menu[j] = this.itemsToUpdate[i]
        }
      }
    }
    this.MenuDB.UpdateMenu(this.menu)
    this.appData.updateAppMenu(this.menu);
  }
}
