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
  FilterForm = new FormGroup({
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
      publishers: this.FilterForm.controls['publishers'].value.split(" "),
      tags: this.FilterForm.controls['tags'].value.split(" "),
      taggedUsers: this.FilterForm.controls['taggedUsers'].value.split(" "),
    }
    if( this.FilterForm.controls['startingDate'].value==''){
      filter.startingDate=new Date('0001-01-01T00:00:00Z');
    }
    else{
    filter.startingDate= this.FilterForm.controls['startingDate'].value;
    }

    if( this.FilterForm.controls['endingDate'].value==''){
      filter.endingDate=new Date('0001-01-01T00:00:00Z');
    }
    else{
      filter.endingDate=this.FilterForm.controls['endingDate'].value;
    }
    if( this.FilterForm.controls['publishers'].value==''){
      filter.publishers=null;
    }
    if( this.FilterForm.controls['tags'].value==''){
      filter.tags=null;
    }
    if( this.FilterForm.controls['taggedUsers'].value==''){
      filter.taggedUsers=null;
    }
    this.FilterPosts.emit(filter);    
  }
}
