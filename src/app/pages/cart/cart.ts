import { Component } from '@angular/core';
import { CartService } from '../../services/cart';
import { CartItem } from '../../models/cart-item.model';
import { OrderService } from '../../services/order';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Order } from '../../models/order.model';
import { ChangeDetectorRef } from '@angular/core';



@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterModule],
  templateUrl: './cart.html',
  styleUrl: './cart.css',
})


export class Cart {

  cartItems: CartItem[] = [];
  total: number = 0;

  userId = Number(localStorage.getItem('userId'));
  showToast = false;
  private toastTimeout: any;



  constructor(
    private cartService: CartService,
    private orderService: OrderService,
    private cdr: ChangeDetectorRef
  ) { }


  ngOnInit() {
    this.loadCart();

  }

  loadCart() {
    this.cartService.getCartItems(this.userId).subscribe(res => {
      this.cartItems = [...res];
      this.calculateTotal();
      this.cdr.detectChanges();

    });
  }


  calculateTotal() {
    this.total = this.cartItems.reduce((sum, item) => {
      return sum + (item.price * item.quantity);
    }, 0);
  }


  updateQuantity(item: CartItem) {
    if (item.quantity < 1) return;

    this.cartService.updateQuantity(item.id!, item.quantity)
      .subscribe(() => {
        this.calculateTotal();
      });
  }


  removeItem(id: number) {
    this.cartService.removeFromCart(id!, this.userId).subscribe(() => {
      this.cartItems = this.cartItems.filter(i => i.id !== id);
      this.calculateTotal();
    });
  }


  placeOrder() {

    if (this.cartItems.length === 0) return;

    const order: Order = {
      userId: this.userId,
      total: this.total,
      status: 'pending',
      date: new Date().toISOString(),
      items: this.cartItems.map(item => ({
        productId: item.productId,
        name: item.name,
        quantity: item.quantity,
        price: item.price
      }))
    };

    this.cartService.clearCart(this.userId).subscribe(() => {
      this.cartItems = [];
      this.total = 0;
    });


    this.orderService.placeOrder(order).subscribe(() => {
      if (this.toastTimeout) {
        clearTimeout(this.toastTimeout);
      }

      this.showToast = true;


      this.toastTimeout = setTimeout(() => {
        this.showToast = false;
        this.cdr.detectChanges();
      }, 3000);

      this.cdr.detectChanges();
    });
  }
}