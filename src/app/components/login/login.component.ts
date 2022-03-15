import { Component, OnInit } from '@angular/core';
import IUser from 'src/app/models/users/users';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
userList: IUser[]=[];
  constructor(private loginService: LoginService) { }

  getUsers() {
    this.loginService.getUsers()
      .subscribe((users) => this.userList = users,
        (error) => console.log(error));
        
  }

  login(){
console.log(this.userList);

  }
  ngOnInit(): void {
    this.getUsers();
  }

}
