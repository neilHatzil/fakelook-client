import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import IPost from 'src/app/models/posts';
import IComment from "src/app/models/comments";
import IUser from 'src/app/models/users';
import ITag from 'src/app/models/tags';
import { PostsService } from 'src/app/services/posts.service';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.css']
})
export class AddPostComponent implements OnInit {
  constructor(private authService: AuthService, private postService:PostsService) { }

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

  ngOnInit(): void { }

  submitPost(): void {
    const post: IPost = {
      id: "",
      description: this.PostForm.controls['description'].value,
      imageSorce: this.PostForm.controls['image'].value,
      x_Position: 0,
      y_Position: 0,
      z_Position: 0,
      date: new Date(),
      comments: [],
      likes:[],
      user:this.authService.getUser(),
      userId:this.authService.getUser().id,
      tags:this.tagSetup(),
      userTaggedPost:[]
    };
this.postService.makePost(post);
  }

  tagSetup():ITag[] {
    let tagArray: string[] = this.PostForm.controls['tags'].value.split(" ");
    let returnArray: ITag[] = [];
    for (let i = 0; i < tagArray.length; i++) {
      returnArray[i]={id:String(i),content:tagArray[i]};
    }
    console.log(returnArray);
    return returnArray;

  }
}
