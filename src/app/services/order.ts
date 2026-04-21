import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Order } from '../models/order.model';

@Injectable({
  providedIn: 'root',
})
export class OrderService {

  // private baseUrl = 'http://localhost:3000';
  private baseUrl = 'https://json-server-api-production-cbdf.up.railway.app';

  constructor(private http: HttpClient) { }

  getOrders(userId: number) {
    return this.http.get<Order[]>(`${this.baseUrl}/orders?userId=${userId}`);
  }

  placeOrder(order: Order) {
    return this.http.post(`${this.baseUrl}/orders`, order);
  }

}
