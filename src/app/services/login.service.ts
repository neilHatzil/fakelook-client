import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import IUser from '../models/users';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'

})
export class LoginService {
  private Url = 'https://localhost:44349/api/';

  getUsers(): Observable<IUser[]> {
    const currentUrl = `${this.Url}User/GetAllUsers`;
    return this.http.get<IUser[]>(currentUrl);
  }

  constructor(private http: HttpClient) { }
}
