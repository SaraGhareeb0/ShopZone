import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../models/product.model';
@Injectable({
  providedIn: 'root',
})
export class ProductService {

  private baseUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  getAllProducts() {
    return this.http.get<Product[]>(`${this.baseUrl}/products`);
  }

  getProductById(id: number) {
    return this.http.get<Product>(`${this.baseUrl}/products/${id}`);
  }

  getByCategory(category: string) {
    return this.http.get<Product[]>(`${this.baseUrl}/products?category=${category}`);
  }
}

