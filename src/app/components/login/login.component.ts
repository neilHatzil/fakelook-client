import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import IPost from 'src/app/models/posts';
import IUser from 'src/app/models/users';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  postList: IPost[] = [];
  constructor(private authService: AuthService) { }
  loginForm = new FormGroup({
    userName: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(4),
    ]),
  });

  submitPost(): void {
    const user: IUser = this.loginForm.value;
   this.authService.login(user);
  }
  ngOnInit(): void {
  }

  
}
