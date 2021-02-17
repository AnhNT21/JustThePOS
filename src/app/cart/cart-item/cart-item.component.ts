import { logging } from 'protractor';
import { Component, OnInit, Output, EventEmitter, Input, ElementRef, ViewChild } from '@angular/core';
import { CartItem } from "./cartItem.model";

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.css']
})
export class CartItemComponent implements OnInit {

  @Output() wantToRemoveItem = new EventEmitter<CartItem>();
  @Output() itemIsEdited = new EventEmitter<void>()
  @Input() item: CartItem;

  @ViewChild('priceInput') priceEl: ElementRef;
  @ViewChild('quantityInput') quantityEl: ElementRef;


  constructor() {
  }

  ngOnInit(): void {
  }

  subQuantity() {
    if (!(this.item.quantity < 2)) {
      this.item.quantity--;
      this.item.calcCost();
      this.itemIsEdited.emit();
    }
  }

  addQuantity() {
    this.item.quantity++;
    this.item.calcCost();
    this.itemIsEdited.emit()
  }

  deleteItem() {
    this.wantToRemoveItem.emit(this.item);
  }

  itemEdited() {
    let changedPrice: number = parseFloat(this.priceEl.nativeElement.value.replace(/,/g, ''))
    let changedQuantity: number = parseFloat(this.quantityEl.nativeElement.value)
    if (changedPrice > 0 && changedQuantity > 0) {
      this.item.quantity = changedQuantity;
      this.item.price = changedPrice;
      this.item.calcCost();
      this.itemIsEdited.emit();
    } else {
      this.priceEl.nativeElement.value = this.item.price;
      this.quantityEl.nativeElement.value = this.item.quantity;
      this.itemIsEdited.emit();
    }
  }
}
