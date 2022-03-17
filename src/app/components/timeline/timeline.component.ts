import { Component, OnInit, ViewChild, ViewChildren } from '@angular/core';
import IPost from 'src/app/models/posts';
import { PostsService } from 'src/app/services/posts.service';
import { PostComponent } from '../post/post.component';

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.css']
})
export class TimelineComponent implements OnInit {
posts:IPost[]=[];
  constructor(private postService: PostsService) { }
  ngOnInit(): void {
    this.getposts();
  }

  getposts(){
    this.postService.getAllPosts().subscribe((result)=>{
      this.posts=result;

    })
  }

}
