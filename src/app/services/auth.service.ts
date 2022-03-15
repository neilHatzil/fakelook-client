import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/internal/Subscription';
import IUser from '../models/users/users';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private url = 'https://localhost:44349/api/';
  subs: Subscription[] = [];


  signUp(user: IUser): void {
    const currentUrl = `${this.url}Auth/SignUp`;
    this.subs.push(
      this.http.post<any>(currentUrl, user).subscribe((res) => {
        this.setToken(res.token);
        this.router.navigateByUrl('/Home');
      })
    );
  }

  private setToken(token: string): void {
    sessionStorage.setItem('token', token);
  }

  constructor(private http: HttpClient, private router: Router) { }
}
