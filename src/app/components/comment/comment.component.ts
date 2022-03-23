import { Component, Input, OnInit } from '@angular/core';
import IComment from 'src/app/models/comments';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {
  //used to convert tag model to string for display
  tags: string = "";

  //used to convert userTag model to string for display
  userTags: string = "";

  @Input() set setComment(value: IComment) {
    if (value) {
      this.comment = value;
      this.setupTags();
      this.setupUserTags();
    }
  }

  @Input() comment: IComment = { id: 0, content: "temp", user: { id: 0, userName: "temp", password: "temp", name: "temp", address: "temp", age: "temp", workplace: "temp", comments: [], posts: [], likes: [], userTaggedPost: [] }, tags: [], userTaggedComment: [] }
  name: string = "";
  constructor() { }

  ngOnInit(): void {
    if (this.comment.user != null) {
      if (this.comment.user.name != null) {
        this.name = this.comment.user.name;
      }
    }
    else {
      this.name = "";
    }
  }

    //used to convert tag model to string for display
    setupTags() {
    
      if(this.comment.tags!=null){
        for(let i=0;i<this.comment.tags.length;i++){
          this.tags="#"+this.comment.tags[i].content+" "+this.tags;
        }
      }
    }
  
    //used to convert userTag model to string for display
    setupUserTags() {
      if(this.comment.userTaggedComment){
        for(let i=0;i<this.comment.userTaggedComment.length;i++){
          this.userTags="@"+this.comment.userTaggedComment[i].user.userName+" "+this.userTags;
        }
      }
    }
}
