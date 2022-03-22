import { Component, OnInit } from '@angular/core';
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

  constructor(private authService: AuthService, private postService: PostsService) { }
  PostForm = new FormGroup({
    startingDate: new FormControl('', [
      Validators.required,
    ]),
    endingDate: new FormControl('', [
      Validators.required,
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
      startingDate: this.PostForm.controls['startingDate'].value,
      endingDate: this.PostForm.controls['endingDate'].value,
      publishers: this.PostForm.controls['publishers'].value.split(" "),
      tags: this.PostForm.controls['tags'].value.split(" "),
      taggedUsers: this.PostForm.controls['taggedUsers'].value.split(" "),
    }
    console.log(filter);
    this.postService.filterPosts(filter);
    
  }
}
