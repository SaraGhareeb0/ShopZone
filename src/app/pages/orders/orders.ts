import { Component } from '@angular/core';
import { OrderService } from '../../services/order';
import { Order } from '../../models/order.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ChangeDetectorRef } from '@angular/core';





@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterModule],
  templateUrl: './orders.html',
  styleUrl: './orders.css',
})



export class Orders {

  orders: Order[] = [];
  userId = Number(localStorage.getItem('userId'));

  constructor(private orderService: OrderService, private cdr: ChangeDetectorRef) { }

  ngOnInit() {
    this.orderService.getOrders(this.userId).subscribe(res => {
      this.orders = res;
      this.cdr.detectChanges();
    });
  }
}