import { MatDialog } from '@angular/material/dialog';
import { MenuItem } from './menu-item.model';
import { Component, OnInit, Input, EventEmitter, Output, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-menu-item',
  templateUrl: './menu-item.component.html',
  styleUrls: ['./menu-item.component.css']
})
export class MenuItemComponent implements OnInit {

  @Input() item: MenuItem;
  @Output() updateMe = new EventEmitter<MenuItem>();
  @Output() deleteMe = new EventEmitter<MenuItem>();

  // @ViewChild('nameField') nameField: ElementRef;
  @ViewChild('priceField') priceField: ElementRef;
  @ViewChild('shortcutField') shortcutField: ElementRef;


  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {

  }

  itemEdited() {
    this.item.price = parseFloat(this.priceField.nativeElement.value.replace(/,/g, ''));
    this.item.shortcut = this.shortcutField.nativeElement.value;
    this.updateMe.emit(this.item);
  }

  confirmPrompt() {
    const dialogRef = this.dialog.open(confirmPrompt);
    dialogRef.afterClosed().subscribe(confirmed => {
      if (confirmed) {
        this.deleteMe.emit(this.item);
      }
    });
  }

}

@Component({
  templateUrl: 'confirmPrompt.html',
  styleUrls: ['./menu-item.component.css']
})

export class confirmPrompt {

}
