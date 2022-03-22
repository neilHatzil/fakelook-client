import { Component, OnInit } from '@angular/core';
import {
  AcNotification,
  ViewerConfiguration,
  ActionType,
} from 'angular-cesium';
import { Observable } from 'rxjs';
import { mergeMap, map } from 'rxjs/operators';
import IPost from 'src/app/models/posts';
import { PostConverter } from 'src/converters/cesium-converter';
import { PostsService } from '../../services/posts.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
  providers: [ViewerConfiguration],
})
export class MapComponent implements OnInit {
  constructor(
    private viewerConf: ViewerConfiguration,
    private postService: PostsService
  ) {
    viewerConf.viewerOptions = {
      selectionIndicator: false,
      timeline: false,
      infoBox: false,
      fullscreenButton: false,
      baseLayerPicker: false,
      animation: false,
      homeButton: false,
      geocoder: false,
      navigationHelpButton: false,
      navigationInstructionsInitiallyVisible: false,
      useDefaultRenderLoop: true,
    };
  }
  entities$!: Observable<AcNotification>;
  posts:IPost[]=[]
  selectedPost!: IPost;
  showDialog = false;
  Cesium = Cesium;
  ngOnInit(): void {

     this.postService.getAllPosts().subscribe((result)=>{
      this.posts=result;      
    })

    this.entities$ = this.postService.getAllPosts().pipe(
      map((posts:any[]) => {
        return posts.map((post) => ({
          id: post.id,
          actionType: ActionType.ADD_UPDATE,
          entity: PostConverter.convertIPost(post)
        }));
      }),
      mergeMap((entity) => entity)
    );    
  }
  showFullPost(post: IPost): void {
    
    for(let i=0;i<this.posts.length;i++){
      if(this.posts[i].id==post.id){
        this.selectedPost=this.posts[i];
      }
    }
    this.showDialog = true;
    //this.selectedPost = post;
  }
  closeDialog(): void {
    this.showDialog = false;
  }
}