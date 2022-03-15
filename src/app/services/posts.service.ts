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

  makePost(post: IPost): void {
    const currentUrl = `${this.url}Post/AddPost`;
    this.subs.push(
      this.http.post<any>(currentUrl, post).subscribe((res) => {
        this.router.navigateByUrl('/Home');
      })
    );
  }
}
