import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import IComment from 'src/app/models/comments';
import IPost from 'src/app/models/posts';
import ITag from 'src/app/models/tags';
import IUserTag from 'src/app/models/userTags';
import { AuthService } from 'src/app/services/auth.service';
import { PostsService } from 'src/app/services/posts.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
  @Output() reloadPostsEvent = new EventEmitter<string>();

  //-------this belongs to map functionality
  @Output() closeDialogEmitter = new EventEmitter();
  close(): void {
    this.closeDialogEmitter.emit();
  }


  //-------this belongs to map functionality

  //-------this belongs to map functionality


  @Input() changing: Subject<boolean>=new Subject;

  //used to show extended information
  isExtended: boolean = false;

  //show and hide inputs for editing
  editing: boolean = false;

  //show edit button (if user is the poster)
  editButton: boolean = false;

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

  @Input() post: IPost = {
    id: 0,
    description: "temp",
    imageSorce: "temp",
    x_Position: 0, y_Position: 0, z_Position: 0,
    date: new Date(),
    comments: [{ id: 0, content: "", user: { id: 0, userName: "temp", password: "temp", name: "temp", address: "temp", age: "temp", workplace: "temp", comments: [], posts: [], likes: [], userTaggedPost: [] }, tags: [], userTaggedComment: [] }],
    likes: null,
    user: null,
    userId: 0,
    tags: [{ content: "first" }, { content: "very nice image! please call me, grandma." }],
    userTaggedPost: []
  };

  constructor(private authService: AuthService, private postService: PostsService, private router: Router) { }

  ngOnInit(): void {   
    this.changing.subscribe(v => { 
      console.log('value is changing', v);
    });
    this.countLikes();
    this.setupTags();
    this.setupUserTags();
    this.addEditButton()
  }

  editPost() {
    this.editing = !this.editing;
  }

  applyChanges() {
    if (this.editing == true) {

      //setting up tags:
      let temparrayTags:string[] = this.tagString.split(" ");
      for (let i = 0; i < temparrayTags.length; i++) {
        if (this.post.tags != null) {
          this.post.tags[i] = { content: temparrayTags[i] };
        }
      }

      //setting up usertags:
      let tempPost: IPost = this.post;
      let temparrayUserTags = this.userTagString.split(" ");
      for (let i = 0; i < temparrayUserTags.length; i++) {
        if (tempPost.userTaggedPost != null) {
          tempPost.userTaggedPost[i] =
          {
            user: {
              id: 0, userName: temparrayUserTags[i], password: "", name: temparrayUserTags[i],
              address: "", age: "1", workplace: "", comments: null, posts: null, likes: null,
              userTaggedPost: null
            },
            userId: null, postId: null, Post: null
          }
        }
        else {
          console.log("didnt make usertag");

        }
      }
      console.log(this.post);

      this.postService.editPost(this.post);
      //, this.userTags.split(" ")
      this.refreshFeed();
    }
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
        this.tags = this.tags + this.post.tags[i].content + ", ";
      }
      this.tagString = this.tags.replace(/,/g, '');
    }
    else {
      this.tags = "empty";
    }
  }

  //used to convert userTag model to string for display
  setupUserTags() {

    if (this.post.userTaggedPost != null) {
      //console.log(this.post.userTaggedPost[0], "this log is in post->setUserTags");
      for (let i = 0; i < this.post.userTaggedPost.length; i++) {
        this.userTags = this.userTags + ", " + this.post.userTaggedPost[i].user.userTaggedPost;
      }
      this.userTagString = this.userTags;
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
        address: "", age: "1", workplace: "", comments: null, posts: null, likes: null,
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
    for (let i = 0; i < temparrayUserTags.length; i++) {
      if (commentToSend.userTaggedComment != null) {
        commentToSend.userTaggedComment[i] =
        {
          user: {
            id: 0, userName: temparrayUserTags[i], password: "", name: temparrayUserTags[i],
            address: "", age: "1", workplace: "", comments: null, posts: null, likes: null,
            userTaggedPost: null
          },
          userId: null, postId: null, Post: null
        }
      }
    }
    console.log(commentToSend);

    this.postService.makeComment(commentToSend);
  }

  refreshFeed() {
    this.reloadPostsEvent.emit();
  }
}
