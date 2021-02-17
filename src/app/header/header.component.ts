import { MenuItem } from './../menu/menu-item/menu-item.model';
import { MatDialog } from '@angular/material/dialog';
import { MenuComponent } from './../menu/menu.component';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(public dialog: MatDialog) { }

  brand = 'Lẩu Vịt 117'

  ngOnInit(): void {
  }

  openMenu() {
    const dialogRef = this.dialog.open(MenuComponent,{
      width: '70vw'
    });

    dialogRef.afterClosed().subscribe(saveChange => {
    });
  }

}
