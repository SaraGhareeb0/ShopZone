import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../services/product';
import { CartService } from '../../services/cart';
import { Product } from '../../models/product.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CartItem } from '../../models/cart-item.model';
import { ChangeDetectorRef } from '@angular/core';



@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterModule],
  templateUrl: './product-detail.html',
  styleUrl: './product-detail.css',
})



export class ProductDetail {

  product!: Product;
  quantity: number = 1;
  errorMessage: string = '';
  showToast = false;
  private toastTimeout: any;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private cartService: CartService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));


    this.productService.getProductById(id).subscribe(res => {
      this.product = res;
      this.cdr.detectChanges();
    });

  }


  validateQuantity() {
    if (this.quantity < 1) {
      this.errorMessage = 'Minimum quantity is 1';
    } else if (this.quantity > this.product.stock) {
      this.errorMessage = 'Exceeds available stock';
    } else {
      this.errorMessage = '';
    }
  }


  addToCart() {

    this.validateQuantity();
    if (this.errorMessage) return;

    const userId = Number(localStorage.getItem('userId'));

    const cartItem: CartItem = {
      userId,
      productId: this.product.id,
      quantity: this.quantity,
      name: this.product.name,
      price: this.product.price,
      image: this.product.image
    };

    this.cartService.addToCart(cartItem).subscribe(() => {

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