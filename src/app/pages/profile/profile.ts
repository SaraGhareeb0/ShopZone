import { Component } from '@angular/core';
import { Auth } from '../../services/auth';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';



@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterModule],
  templateUrl: './profile.html',
  styleUrl: './profile.css',
})




export class Profile {

  user: any;
  userId = localStorage.getItem('userId');

  constructor(private authService: Auth) { }

  ngOnInit() {
    this.user = this.authService.getCurrentUser();
  }

  logout() {
    this.authService.logout();
  }
}