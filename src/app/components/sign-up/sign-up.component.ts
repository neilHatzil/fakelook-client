import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import IUser from 'src/app/models/users/users';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  constructor(private authService: AuthService) {}
  signUpForm = new FormGroup({
    firstName: new FormControl('', [
      Validators.required,
      Validators.minLength(2),
    ]),
    userName: new FormControl('', [
      Validators.required,
      Validators.minLength(2),
    ]),
    age: new FormControl('', [
      Validators.required,
    ]),
    address: new FormControl('', [
      Validators.required,
      Validators.minLength(2),
    ]),
    workPlace: new FormControl('', [
      Validators.required,
      Validators.minLength(2),
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(4),
    ])
  });

  ngOnInit(): void {}
  submitPost(): void {
    
    //const name= this.signUpForm.controls['firstName'].value
    //const user: IUser = this.signUpForm.value;

    const user: IUser = {
      username:this.signUpForm.controls['userName'].value,
      name: this.signUpForm.controls['firstName'].value,
      password:this.signUpForm.controls['password'].value,
      address:this.signUpForm.controls['address'].value,
      age:String(this.signUpForm.controls['age'].value),
      workplace:this.signUpForm.controls['workPlace'].value,
    };
    console.log(user);
    this.authService.signUp(user);
  }
}
