import { Component } from '@angular/core';
import { ProductService } from '../../services/product';
import { Product } from '../../models/product.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ChangeDetectorRef } from '@angular/core';
import { CartService } from '../../services/cart';
import { CartItem } from '../../models/cart-item.model';



@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterModule],
  templateUrl: './product-list.html',
  styleUrl: './product-list.css',
})


export class ProductList {

  products: Product[] = [];
  filteredProducts: Product[] = [];

  searchTerm: string = '';
  selectedCategory: string = 'All';

  categories: string[] = [];
  showToast = false;
  private toastTimeout: any;

  constructor(private productService: ProductService, private cdr: ChangeDetectorRef, private cartSer: CartService) { }

  ngOnInit() {
    this.productService.getAllProducts().subscribe(res => {

      this.products = [...res];

      this.filteredProducts = [...res];

      this.categories = ['All', ...new Set(res.map(p => p.category))];

      this.cdr.detectChanges();
    });
  }


  applyFilters() {
    this.filteredProducts = this.products.filter(product => {

      const matchesSearch =
        product.name.toLowerCase().includes(this.searchTerm.toLowerCase());

      const matchesCategory =
        this.selectedCategory === 'All' ||
        product.category === this.selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }


  addToCart(product: any) {

    const userId = Number(localStorage.getItem('userId'));

    const cartItem: CartItem = {
      userId,
      productId: product.id,
      quantity: 1, // default from list
      name: product.name,
      price: product.price,
      image: product.image
    };

    this.cartSer.addToCart(cartItem).subscribe(() => {
      if (this.toastTimeout) {
        clearTimeout(this.toastTimeout);
      }

      this.showToast = true;


      this.toastTimeout = setTimeout(() => {
        this.showToast = false;
        this.cdr.detectChanges();
      }, 3000);

      this.cdr.detectChanges();
    })
  }


}