import { Component } from '@angular/core';
import { Auth } from '../../services/auth';
import { CartService } from '../../services/cart';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})



export class Navbar {

  cartCount = 0;
  isMenuOpen = false;

  constructor(
    public authService: Auth,
    private cartService: CartService
  ) { }

  ngOnInit() {
    const userId = Number(localStorage.getItem('userId'));
    if (userId) {
      this.cartService.refreshCartCount(userId);
    }

    this.cartService.cartCount$.subscribe(count => {
      this.cartCount = count;
    });
  }

  logout() {
    this.authService.logout();
  }



  closeMenu() {
    this.isMenuOpen = false;
  }



}