import { Component, OnInit, ViewChild, ViewChildren } from '@angular/core';
import { Subject } from 'rxjs';
import IFilter from 'src/app/models/filters';
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

//used to notify posts the content has arrived
  constructor(private postService: PostsService) { }
  ngOnInit(): void {
    this.getposts();
  }

  getFilteredPosts(filter:IFilter){
this.postService.filterPosts(filter).subscribe((result)=>{
  this.posts=result;      
})

  }
  getposts(){
    this.postService.getAllPosts().subscribe((result)=>{
      this.posts=result;
    })
  }

}
