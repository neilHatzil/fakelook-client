import { Component, Input, OnInit } from '@angular/core';
import IComment from 'src/app/models/comments';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {
  @Input() comment:IComment={id:0, content:"temp",user: { id: 0,userName:"temp",password:"temp",name:"temp",address:"temp",age:"temp",workplace:"temp",comments:[],posts:[],likes:[],userTaggedPost:[] },tags:[],userTaggedComment:[]} 
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
