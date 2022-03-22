import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of, Subscription, combineLatest } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import IPost from '../models/posts';
import IUser from '../models/users';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private url = 'https://localhost:44349/api/';
  subs: Subscription[] = [];

  login(user: IUser): void {
    const currentUrl = `${this.url}Auth/Login`;
    
    this.subs.push(
      this.http.post<any>(currentUrl, user).subscribe((res) => {
        this.setToken(res.token);
        this.setUser(res.user);
        this.router.navigateByUrl('/Home/Timeline');
        
      })
    );
  }

  signUp(user: IUser): void {
    const currentUrl = `${this.url}Auth/SignUp`;
    this.subs.push(
      this.http.post<any>(currentUrl, user).subscribe((res) => {
        this.setToken(res.token);
        this.router.navigateByUrl('/Home/Timeline');
      })
    );
  }

  private setToken(token: string): void {
    sessionStorage.setItem('token', token);
  }
  private getToken(): string | null {
    return sessionStorage.getItem('token');
  } 
  private setUser(user: IUser): void {
    sessionStorage.setItem('user', JSON.stringify(user));
  }
  public getUser(): IUser {
    var user:IUser=JSON.parse(sessionStorage.getItem('user')||"");
    return user;
  }

  constructor(private http: HttpClient, private router: Router) { }

  checkAccess(): Observable<boolean> {
    const currentUrl = `${this.url}Auth/TestAll`;

    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + this.getToken(),
    });

    return this.http.get(currentUrl, {headers}).pipe(
      map((_) => true),
      catchError((_) => of(false))
    );
  }
}
