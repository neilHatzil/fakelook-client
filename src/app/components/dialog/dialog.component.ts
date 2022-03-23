import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import IComment from 'src/app/models/comments';
import IPost from 'src/app/models/posts';
import IUserTagComment from 'src/app/models/userTagComment';
import { AuthService } from 'src/app/services/auth.service';
import { PostsService } from 'src/app/services/posts.service';
import { MatDialog } from '@angular/material/dialog';
import { Inject } from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';



@Component({
  selector: 'app-dialog',
  templateUrl: './Dialog.component.html',
  styleUrls: ['./Dialog.component.css']
})
export class DialogComponent implements OnInit {
  @Output() reloadPostsEvent = new EventEmitter<string>();

  //used to populate post with values
  username: string = "";
  date: string = "";

  userliked: boolean = false;
  likeAmount: number = 0;

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
      console.log(this.post); 

    }

  ngOnInit(): void {
    //this.post=this.data        
    this.countLikes();
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
    //this.date = new Date(this.post.date).toISOString().split("T")[0];
  }

 
  //counts the likes on the post for display
  countLikes() {
    if (this.post.likes != null) {
      this.likeAmount = this.post.likes.length;
      for (let i = 0; i < this.post.likes.length; i++) {
        if (this.post.likes[i].userId == Number(this.authService.getUser().id)) {
          this.userliked = true;
        }
      }
    }
    else {
      this.likeAmount = 0;
    }
  }

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

 

  likeUnlike() {
    if (this.userliked) {
      this.likeAmount--;
      this.userliked = false;
    }
    else {
      this.likeAmount++;
      this.userliked = true;
    }
    this.postService.likeUnlike(Number(this.post.id), Number(this.authService.getUser().id));
  }

  addComment() {
    //comment:string="";
    //commentTags:string="";
    //commentUserTags:string="";
    const commentToSend: IComment = {
      content: this.comment,
      userId: Number(this.authService.getUser().id),
      postId: this.post.id,
      id: 0,
      user: {
        id: 0, userName: this.authService.getUser().userName, password: "", name: "temp",
        address: "", age: "1", workPlace: "", comments: null, posts: null, likes: null,
        userTaggedPost: null
      },
      tags: [],
      userTaggedComment: []
    }
    //setting up tags:
    let temparrayTags = this.commentTags.split(" ");
    for (let i = 0; i < temparrayTags.length; i++) {
      if (commentToSend.tags != null) {
        commentToSend.tags[i] = { content: temparrayTags[i] };
      }
    }

    //setting up usertags:
    let temparrayUserTags = this.commentUserTags.split(" ");
    let temparrayUserTagsArray: IUserTagComment[] = [];
    for (let i = 0; i < temparrayUserTags.length; i++) {
      if (commentToSend.userTaggedComment != null) {

        temparrayUserTagsArray[i] =
        {
          user: {
            userName: temparrayUserTags[i]
          },
          /*userId: null, commentId: null, comment: null*/
        }
      }
    }
    commentToSend.userTaggedComment = temparrayUserTagsArray;
    this.post.comments[this.post.comments.length] = commentToSend;
    this.postService.makeComment(commentToSend);
  }

  refreshFeed() {
    this.reloadPostsEvent.emit();
  }
}
