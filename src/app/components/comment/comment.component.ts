import { Component, Input, OnInit } from '@angular/core';
import IComment from 'src/app/models/comments';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {
  @Input() comment:IComment={content:"temp",user: { id: "0",username:"temp",password:"temp",name:"temp",address:"temp",age:"temp",workplace:"temp",comments:[],posts:[],likes:[],userTaggedPost:[] }} 
  name:string="";
  constructor() { }

  ngOnInit(): void {
if(this.comment.user!=null){
  if(this.comment.user.name!=null){
  this.name=this.comment.user.name;
  }
}   
else{
  this.name="";
} 
  }

}
