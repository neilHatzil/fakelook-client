import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import IPost from 'src/app/models/posts';
import IComment from "src/app/models/comments";
import IUser from 'src/app/models/users';
import ITag from 'src/app/models/tags';
import { PostsService } from 'src/app/services/posts.service';
import IUserTag from 'src/app/models/userTags';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.css']
})
export class AddPostComponent implements OnInit {
  
  constructor(private authService: AuthService, private postService: PostsService) { }
  userTags:string[]=[];
  PostForm = new FormGroup({
    description: new FormControl('', [
      Validators.required,
      Validators.minLength(2),
    ]),
    image: new FormControl('', [
      Validators.required,
    ]),
    tags: new FormControl('', [
      Validators.required,
      Validators.minLength(2),
    ]),
    userTags: new FormControl('', [
      Validators.required,
      Validators.minLength(2),
    ]),
  });

  ngOnInit(): void {

   }

  submitPost(): void {
    
    const post: IPost = {
      id: 0,
      description: this.PostForm.controls['description'].value,
      imageSorce: this.PostForm.controls['image'].value,
      x_Position: 0,
      y_Position: 0,
      z_Position: 0,
      date: new Date(),
      comments: [],
      //likes: null,
      //user: this.authService.getUser(),
      userId: Number(this.authService.getUser().id),
      tags: [], //this.tagSetup()
      userTaggedPost: this.userTagSetup()
    };
    

    navigator.geolocation.getCurrentPosition((data) => {
      post.x_Position = data.coords.longitude;
      post.y_Position = data.coords.latitude;
      console.log(post.x_Position);
      console.log(post.y_Position);
      post.z_Position = 0;
    });
    console.log(post);
    
    this.postService.makePost(post);
  }

  tagSetup(): ITag[] {
    let tagArray: string[] = this.PostForm.controls['tags'].value.split(" ");
    let returnArray: ITag[] = [];
    for (let i = 0; i < tagArray.length; i++) {
      returnArray[i] = { content: tagArray[i]};
    }
    return returnArray;
  }

  userTagSetup():IUserTag[] {
    let userTagArray: string[] = this.PostForm.controls['userTags'].value.split(" ");
    let returnArray: IUserTag[] = [];
    for (let i = 0; i < userTagArray.length; i++) {
      returnArray[i] = { user:{ id: 0, username:userTagArray[i], password: "temp", name: "temp", address: "temp", age: "temp", workplace: "temp", comments: [], posts: [], likes: [], userTaggedPost: []},userId:0,postId:0,Post:null};
    }
    return returnArray;
  }
  
}
