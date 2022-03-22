import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { PostsService } from 'src/app/services/posts.service';
import IFilter from 'src/app/models/filters';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnInit {
  @Output() FilterPosts = new EventEmitter<IFilter>();
  constructor(private authService: AuthService, private postService: PostsService) { }
  PostForm = new FormGroup({
    startingDate: new FormControl('', [
    ]),
    endingDate: new FormControl('', [
    ]),
    publishers: new FormControl('', [
    ]),
    tags: new FormControl('', [

    ]),
    
    taggedUsers: new FormControl('', [

    ]),
  });

  ngOnInit(): void {
  }
  submitFilter() {
    const filter: IFilter = {
      
      startingDate:null,
      endingDate: null,
      publishers: this.PostForm.controls['publishers'].value.split(" "),
      tags: this.PostForm.controls['tags'].value.split(" "),
      taggedUsers: this.PostForm.controls['taggedUsers'].value.split(" "),
    }
    if( this.PostForm.controls['startingDate'].value==''){
      filter.startingDate=new Date('0001-01-01T00:00:00Z');
    }
    else{
    filter.startingDate= this.PostForm.controls['startingDate'].value;
    }

    if( this.PostForm.controls['endingDate'].value==''){
      filter.endingDate=new Date('0001-01-01T00:00:00Z');
    }
    else{
      filter.endingDate=this.PostForm.controls['endingDate'].value;
    }
    if( this.PostForm.controls['publishers'].value==''){
      filter.publishers=null;
    }
    if( this.PostForm.controls['tags'].value==''){
      filter.tags=null;
    }
    if( this.PostForm.controls['taggedUsers'].value==''){
      filter.taggedUsers=null;
    }
    this.FilterPosts.emit(filter);

    //this.postService.filterPosts(filter);
    
  }
}
