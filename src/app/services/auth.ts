import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class Auth {


  private baseUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  login(email: string, password: string): Observable<User[]> {
    return this.http.get<User[]>(
      `${this.baseUrl}/users?email=${email}&password=${password}`
    );
  }

  register(user: any) {
    return this.http.post(`${this.baseUrl}/users`, user);
  }

  logout() {
    localStorage.removeItem('userId');
    localStorage.removeItem('currentUser');
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('userId');
  }

  getCurrentUser(): User | null {
    const user = localStorage.getItem('currentUser');
    return user ? JSON.parse(user) : null;
  }
}