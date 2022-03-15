import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import IPost from 'src/app/models/posts';
import IComment from "src/app/models/comments";


@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.css']
})
export class AddPostComponent implements OnInit {
  constructor(private authService: AuthService) { }

  PostForm = new FormGroup({
    id: new FormControl('', [
      Validators.required,
      Validators.minLength(2),
    ]),
    text: new FormControl('', [
      Validators.required,
      Validators.minLength(2),
    ]),
    image: new FormControl('', [
      Validators.required,
    ]),
    location: new FormControl('', [
      Validators.required,
      Validators.minLength(2),
    ]),
    date: new FormControl('', [
      Validators.required,
      Validators.minLength(2),
    ]),
    isliked: new FormControl('', [
      Validators.required,
      Validators.minLength(4),
    ])
  });

  ngOnInit(): void { }

  submitPost(): void {
    const post: IPost = {
      id: "",
      text: this.PostForm.controls['text'].value,
      image: this.PostForm.controls['image'].value,
      location: { x: 0, y: 0, z: 0 },
      date: new Date(),
      isLiked: false,
      comments: []
    };
    console.log(post);
    //this.authService.signUp(user);
  }
}
//User/<username> to get id