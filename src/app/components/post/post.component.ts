import { Component, Input, OnInit } from '@angular/core';
import IComment from 'src/app/models/comments';
import IPost from 'src/app/models/posts';
import { PostsService } from 'src/app/services/posts.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
  isExtended: boolean = false;
  likeAmount = 0;
  commentsStr: string = "";
  tags: string = "";
  @Input() post: IPost = {
    id: 0,
    description: "temp",
    imageSorce: "temp",
    x_position: 0, y_position: 0, z_position: 0,
    date: new Date(),
    comments: [{ content: "", user: { id: "0",username:"temp",password:"temp",name:"temp",address:"temp",age:"temp",workplace:"temp",comments:[],posts:[],likes:[],userTaggedPost:[] } }],
    likes: null,
    user: null,
    userId: "avi",
    tags: [{ content: "first" }, { content: "very nice image! please call me, grandma." }],
    userTaggedPost: []
  };
  constructor(private postService: PostsService) { }

  ngOnInit(): void {
    this.countLikes();
    //this.setupComments();
    this.setupTags();    
  }
  countLikes() {
    if (this.post.likes != null) {
      this.likeAmount = this.post.likes.length;
    }
    else {
      this.likeAmount = 0;
    }
  }
  setupComments() {
    if (this.post.comments != null) {
      for (let i = 0; i < this.post.comments.length; i++) {
        this.commentsStr = this.commentsStr + '\n' + this.post.comments[i].content
      }
    }
    else {
      this.commentsStr = "";
    }

  }
  setupTags() {
    if (this.post.tags != null) {
      for (let i = 0; i < this.post.tags.length; i++) {
        this.tags = this.tags + ", " + this.post.tags[i].content
      }
    }

    else {
      this.tags = "empty";
    }
  }
  expandPost() {
    this.isExtended = !this.isExtended;
  }
}
