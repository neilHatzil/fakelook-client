import { Component, OnInit } from '@angular/core';
import {
  AcNotification,
  ViewerConfiguration,
  ActionType,
} from 'angular-cesium';
import { Observable } from 'rxjs';
import { mergeMap, map, tap, pairwise } from 'rxjs/operators';
import IFilter from 'src/app/models/filters';
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
  filteredentities$!: Observable<AcNotification>;
  posts: IPost[] = []
  selectedPost!: IPost;
  showDialog = false;
  Cesium = Cesium;
  ngOnInit(): void {

    this.postService.getAllPosts().subscribe((result) => {
      this.posts = result;
    })

    this.entities$ = this.postService.getAllPostsMap().pipe(
      pairwise(),
      map((posts) => {
        const combine=posts[0].concat(posts[1]);
        return combine.map((post) => ({
          id: post.id.toString(),
          actionType: this.getActionType(post,posts[1]),
          entity: PostConverter.convertIPost(post)
        }));
      }),
      mergeMap((entity) => entity)
    );

  }

  getActionType(post: IPost, newPosts: IPost[]): ActionType {
    let action;
    newPosts.find((p) => p.id === post.id)
      ? (action = ActionType.ADD_UPDATE)
      : (action = ActionType.DELETE);
    return action;
  }

  showFullPost(post: IPost): void {

    for (let i = 0; i < this.posts.length; i++) {
      if (this.posts[i].id == post.id) {
        this.selectedPost = this.posts[i];
      }
    }
    this.showDialog = true;
    //this.selectedPost = post;
  }
  closeDialog(): void {
    this.showDialog = false;
  }

  getFilteredPosts(filter: IFilter) {
  this.postService.filterPostsMap(filter)
    /*  let tester: boolean = false;
    this.postService.filterPosts(filter).subscribe((result) => {
      this.posts = result;
      for (let i = 0; i < this.posts.length; i++) {
      }

      this.entities$.forEach(e => {
        this.posts.forEach(p=>{
          if (e.id == p.id.toString()) {
            tester = true;
          }
        })
        if (tester == false) {
          console.log(e.id);
          e.actionType = ActionType.DELETE
        }
        tester = false;
      })
      this.entities$.forEach(console.log)
    })
  */}
}