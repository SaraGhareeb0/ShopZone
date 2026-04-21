import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';
import { CartItem } from '../models/cart-item.model';
import { BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class CartService {

  private baseUrl = 'http://localhost:3000';




  constructor(private http: HttpClient) { }

  cartCount$ = new BehaviorSubject<number>(0);
  getCartItems(userId: number) {
    return this.http.get<CartItem[]>(`${this.baseUrl}/cart?userId=${userId}`);
  }




  addToCart(item: CartItem) {
    return this.http.post(`${this.baseUrl}/cart`, item).pipe(
      tap(() => {
        this.refreshCartCount(item.userId);
      })
    );
  }
  updateQuantity(id: number, quantity: number) {
    return this.http.patch(`${this.baseUrl}/cart/${id}`, { quantity });
  }


  removeFromCart(id: number, userId: number) {
    return this.http.delete(`${this.baseUrl}/cart/${id}`).pipe(
      tap(() => {
        this.refreshCartCount(userId);
      })
    );
  }

  clearCart(userId: number) {
    return this.getCartItems(userId).pipe(
      tap(items => {
        items.forEach(item => {
          this.http.delete(`${this.baseUrl}/cart/${item.id}`).subscribe();
        });
        this.cartCount$.next(0);
      })
    );
  }

  refreshCartCount(userId: number) {
    this.getCartItems(userId).subscribe(items => {
      this.cartCount$.next(items.length);
    });
  }

}


