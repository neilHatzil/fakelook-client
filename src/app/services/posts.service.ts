import { Injectable } from '@angular/core';
import { Observable, of, Subscription, combineLatest } from 'rxjs';
import IPost from '../models/posts';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class PostsService {
  private url = 'https://localhost:44349/api/';

  subs: Subscription[] = [];

  constructor(private http: HttpClient, private router: Router) { }

  private Url = 'https://localhost:44349/api/';

  private getToken(): string | null {
    return sessionStorage.getItem('token');
  }

  makePost(post: IPost): void {
    const currentUrl = `${this.url}Post/AddPost`;
    this.subs.push(
      this.http.post<any>(currentUrl, post).subscribe((res) => {
        this.router.navigateByUrl('/Home');
      })
    );
  }
    getAllPosts(): Observable<IPost[]> {
      const currentUrl = `${this.url}Post/GetAllPosts`;
  
      const headers = new HttpHeaders({
        Authorization: 'Bearer ' + this.getToken(),
      });
      return this.http.get<IPost[]>(currentUrl,{ headers });
    }
 }
