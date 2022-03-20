import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import IComment from 'src/app/models/comments';
import IPost from 'src/app/models/posts';
import { AuthService } from 'src/app/services/auth.service';
import { PostsService } from 'src/app/services/posts.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
  @Output() reloadPostsEvent = new EventEmitter<string>();

  //used to show extended information
  isExtended: boolean = false;

  userliked: boolean = false;
  likeAmount: number = 0;

  //used to edit tags and user tags
  tagString: string = "";
  userTagString:string="";

  //used to convert tag model to string for display
  tags: string = "";

  //used to convert userTag model to string for display
  userTags: string = "";


  //show edit button (if user is the poster)
  editButton: boolean = false;

  //show and hide inputs for editing
  editing: boolean = false;

  @Input() post: IPost = {
    id: 0,
    description: "temp",
    imageSorce: "temp",
    x_position: 0, y_position: 0, z_position: 0,
    date: new Date(),
    comments: [{id:0, content: "", user: { id: "0", username: "temp", password: "temp", name: "temp", address: "temp", age: "temp", workplace: "temp", comments: [], posts: [], likes: [], userTaggedPost: [] },tags:[],userTaggedComment:[] }],
    likes: null,
    user: null,
    userId: "avi",
    tags: [{ content: "first" }, { content: "very nice image! please call me, grandma." }],
    userTaggedPost: []
  };

  constructor(private authService: AuthService, private postService: PostsService, private router: Router) { }

  ngOnInit(): void {
    this.countLikes();
    this.setupTags();
    this.setupUserTags();
    this.addEditButton()
  }

  editPost() {
    if(this.editing==true){
      this.postService.editPost(this.post,this.userTags.split(" "));
      console.error("the error below occurs because editPost is not working yet- post 405 (postcomp)");
      this.refreshFeed();
    }
    this.editing=!this.editing;
  }

  //adds edit button to posts made by the user
  addEditButton() {
    if (this.post.userId == this.authService.getUser().id) {
      this.editButton = true;
    }
  }

  //counts the likes on the post for display
  countLikes() {
    if (this.post.likes != null) {
      this.likeAmount = this.post.likes.length;
      for (let i = 0; i < this.post.likes.length; i++) {
        if (this.post.likes[i].userId == this.authService.getUser().id) {
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
        this.tags = this.tags  + this.post.tags[i].content+ ", ";
      }
      this.tagString=this.tags.replace(/,/g, '');
    }
    else {
      this.tags = "empty";
    }
  }

  //used to convert userTag model to string for display
  setupUserTags() {
    if (this.post.userTaggedPost != null) {
      for (let i = 0; i < this.post.userTaggedPost.length; i++) {
        //console.log(this.userTags);
        //console.log(this.post.userTaggedPost[i].user);
        this.userTags = this.userTags + ", " + this.post.userTaggedPost[i].user;
      }
      this.userTagString=this.userTags;
    }
    else {
      this.userTags = "empty";
    }
  }

  //used to show extended information
  expandPost() {
    this.isExtended = !this.isExtended;
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
    this.postService.likeUnlike(Number(this.post.id), parseInt(this.authService.getUser().id));
  }

  addComment(){
    //this.postService.makeComment();
  }

  refreshFeed(){
    this.reloadPostsEvent.emit();
  }
}
