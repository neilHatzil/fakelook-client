import { Component, EventEmitter, Inject, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import IComment from 'src/app/models/comments';
import IPost from 'src/app/models/posts';
import IUserTagComment from 'src/app/models/userTagComment';
import { AuthService } from 'src/app/services/auth.service';
import { PostsService } from 'src/app/services/posts.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';


@Component({
  selector: 'app-edit-dialog',
  templateUrl: './edit-dialog.component.html',
  styleUrls: ['./edit-dialog.component.css']
})
export class EditDialogComponent implements OnInit {
  @Output() reloadPostsEvent = new EventEmitter<string>();

  //used to populate post with values
  username: string = "";
  date: string = "";

  //used to edit tags and user tags
  tagString: string = "";
  userTagString: string = "";

  //used to convert tag model to string for display
  tags: string = "";

  //used to convert userTag model to string for display
  userTags: string = "";

  //used for creating comments:
  comment: string = "";
  commentTags: string = "";
  commentUserTags: string = "";
  post!: IPost;

  constructor(private authService: AuthService,
    private postService: PostsService,
    private router: Router,
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data:{dataKey: IPost}) { 
      this.post=this.data.dataKey
    }

  ngOnInit(): void {
    this.setups();
  }

  setups() {
    this.setupTags();
    this.setupUserTags();
    this.postValuesSetup();
  }

  postValuesSetup() {
    //username
    if (this.post.user?.userName) {
      this.username = this.post.user?.userName;
    }

    //date
    this.date = new Date(this.post.date).toISOString().split("T")[0];
  }

  applyChanges() {
    if (true) {

      //setting up tags:
      this.post.tags = [];
      let temparrayTags: string[] = this.tagString.split(" ");
      for (let i = 0; i < temparrayTags.length; i++) {
        if (this.post.tags != null) {
          this.post.tags[i] = { content: temparrayTags[i] };
        }
      }

      //setting up usertags:
      let tempPost: IPost = this.post;
      let temparrayUserTags: string[] = this.userTagString.split(" ");
      this.post.userTaggedPost = [];
      for (let i = 0; i < temparrayUserTags.length; i++) {
        if (tempPost.userTaggedPost != null) {
          tempPost.userTaggedPost[i] =
          {
            user: {
              id: 0, userName: temparrayUserTags[i], password: "", name: temparrayUserTags[i],
              address: "", age: "1", workPlace: "", comments: [], posts: [], likes: [],
              userTaggedPost: null
            },
            userId: 0, postId: 0, Post: null
          }
        }
        else {
          console.log("didnt make usertag");

        }
      }
      this.postService.editPost(this.post);
      this.setups();
    }
  }
 
  //counts the likes on the post for display
 
  //used to convert tag model to string for display
  setupTags() {
    if (this.post.tags != null) {
      for (let i = 0; i < this.post.tags.length; i++) {
        this.tags = "#" + this.post.tags[i].content + " " + this.tags;
      }
    }
  }

  //used to convert userTag model to string for display
  setupUserTags() {
    if (this.post.userTaggedPost) {
      for (let i = 0; i < this.post.userTaggedPost.length; i++) {
        this.userTags = "@" + this.post.userTaggedPost[i].user.userName + " " + this.userTags;
      }
    }
  }

}
