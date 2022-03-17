import { Component, Input, OnInit } from '@angular/core';
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
  comments:string="";
  tags:string="";
  @Input() post: IPost = {
    id: "0",
    description: "this is my post",
    imageSorce: "https://i.pinimg.com/originals/2d/ac/5a/2dac5a70fe092e424b778f0b0f84ceb7.jpg",
    x_Position: 0, y_Position: 0, z_Position: 0,
    date: new Date(),
    comments: [{ id: "0", content: "first" }, { id: "1", content: "very nice image! please call me, grandma." }], likes: [],
    user:null, userId: "avi", tags: [], userTaggedPost: []
  };
  constructor(private postService: PostsService) { }

  ngOnInit(): void {
    this.countLikes();
    this.setupComments();
  }
  countLikes() {
    this.likeAmount = this.post.likes.length;
  }
  setupComments(){
    for(let i=0;i<this.post.comments.length;i++){    
      this.comments= this.comments+ '\n' +this.post.comments[i].content
    }
  }
  setupTags(){
    for(let i=0;i<this.post.tags.length;i++){    
      this.tags= this.tags+ ", " +this.post.tags[i].content
    }
  }
  expandPost() {
    this.isExtended = !this.isExtended;
  }
}
