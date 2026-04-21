import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Auth } from '../../services/auth';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';



@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css'],
})


export class Login implements OnInit {

  errorMessage = '';
  loginForm!: ReturnType<FormBuilder['group']>;

  constructor(
    private fb: FormBuilder,
    private authService: Auth,
    private router: Router
  ) { }

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });
  }


  // onSubmit() {
  //   if (this.loginForm.invalid) return;

  //   const { email, password } = this.loginForm.value;

  //   this.authService.login(email!, password!).subscribe(res => {
  //     if (res.length > 0) {
  //      
  //       this.router.navigate(['/products']);
  //     } else {
  //       this.errorMessage = 'Invalid email or password';
  //     }
  //   });
  // }

  // onSubmit() {
  //   if (this.loginForm.invalid) return;

  //   const email = this.loginForm.value.email?.trim().toLowerCase();
  //   const password = this.loginForm.value.password?.trim();

  //   this.authService.login(email!, password!).subscribe({
  //     next: (res) => {
  //       console.log('LOGIN RESPONSE:', res);
  //       if (res && res.length > 0) {
  //         const user = res[0];

  //         localStorage.setItem('userId', user.id.toString());
  //         localStorage.setItem('currentUser', JSON.stringify(user));

  //         this.router.navigate(['/products']);
  //       } else {
  //         this.errorMessage = 'Invalid email or password';
  //       }
  //     },
  //     error: () => {
  //       this.errorMessage = 'Login failed';
  //     }
  //   });
  // }

  onSubmit() {
    if (this.loginForm.invalid) return;

    const email = this.loginForm.value.email?.trim().toLowerCase();
    const password = String(this.loginForm.value.password?.trim());

    this.authService.login(email!, password!).subscribe({
      next: (res) => {
        console.log(res);

        if (Array.isArray(res) && res.length > 0) {
          const user = res[0];

          localStorage.setItem('userId', user.id.toString());
          localStorage.setItem('currentUser', JSON.stringify(user));

          this.router.navigate(['/products']);
        } else {
          this.errorMessage = 'Invalid email or password';
        }
      }
    });
  }
}


