import { Injectable } from '@angular/core';
import { Observable, of, Subscription, combineLatest } from 'rxjs';
import IPost from '../models/posts';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import IComment from '../models/comments';
import IFilter from '../models/filters';

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
      this.http.post<any>(currentUrl,post).subscribe(() => {
        this.router.navigateByUrl('/Home/Timeline');
      })
    );
  }

  makeComment(comment: IComment): void {
    const currentUrl = `${this.url}Post/AddComment`;
    this.subs.push(
      this.http.post<any>(currentUrl,comment).subscribe(() => {
      })
    );
  }

  editPost(post: IPost): void {
    const currentUrl = `${this.url}Post/EditPost`;
    this.subs.push(
      this.http.post<any>(currentUrl,post).subscribe(() => {
      })
    );
  }

  likeUnlike(postId:number,userId:number): void {
    const currentUrl = `${this.url}Post/LikeUnlike/${postId}/${userId}`; //?postId=1017&userId=7
    this.subs.push(
      this.http.post<any>(currentUrl,{postId:postId,userId:userId}).subscribe(() => {
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

    filterPosts(filter: IFilter): void {
      const currentUrl = `${this.url}Post/Filter`;
      this.subs.push(
        this.http.post<any>(currentUrl,filter).subscribe(() => {
        })
      );
    }
 }
