import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Auth } from '../../services/auth';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ChangeDetectorRef } from '@angular/core';



@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterModule],
  templateUrl: './register.html',
  styleUrl: './register.css',
})

export class Register {

  registerForm: any;
  showToast = false;
  private toastTimeout: any;

  constructor(
    private fb: FormBuilder,
    private authService: Auth,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit() {
    this.registerForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', Validators.required]
    }, {
      validators: this.passwordMatchValidator
    });
  }

  passwordMatchValidator(form: any) {
    const password = form.get('password')?.value;
    const confirm = form.get('confirmPassword')?.value;

    return password === confirm ? null : { mismatch: true };
  }

  onSubmit() {
    if (this.registerForm.invalid) return;

    const { name, email, password } = this.registerForm.value;

    const newUser = {
      name,
      email,
      password,
      role: 'user'
    };

    this.authService.register(newUser).subscribe(() => {
      if (this.toastTimeout) {
        clearTimeout(this.toastTimeout);
      }

      this.showToast = true;


      this.toastTimeout = setTimeout(() => {
        this.showToast = false;
        this.router.navigate(['/login']);
        this.cdr.detectChanges();
      }, 3000);

      this.cdr.detectChanges();

    });
  }
}