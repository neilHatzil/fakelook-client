import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AcMapComponent, AngularCesiumWidgetsModule, AcHtmlDescComponent, AcLayerComponent } from 'angular-cesium';
import { AngularCesiumModule } from 'angular-cesium';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { HomeComponent } from './components/home/home.component';
import { MapComponent } from './components/map/map.component';
import { TimelineComponent } from './components/timeline/timeline.component';
import { AddPostComponent } from './components/add-post/add-post.component';
import { PostComponent } from './components/post/post.component';
import { CommentComponent } from './components/comment/comment.component';
import { PostsService } from './services/posts.service';
import { FilterComponent } from './components/filter/filter.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatFormFieldModule} from '@angular/material/form-field';
import{ MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatDialogModule} from '@angular/material/dialog';
import { DialogComponent } from './components/dialog/dialog.component';
import {MatButtonModule} from '@angular/material/button';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import { EditDialogComponent } from './components/edit-dialog/edit-dialog.component';
import { MapPostComponent } from './components/map-post/map-post.component';




@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignUpComponent,
    HomeComponent,
    MapComponent,
    TimelineComponent,
    AddPostComponent,
    PostComponent,
    CommentComponent,
    FilterComponent,
    DialogComponent,
    EditDialogComponent,
    MapPostComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule,
    AngularCesiumWidgetsModule,
    AngularCesiumModule.forRoot(),
    BrowserAnimationsModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    BrowserAnimationsModule ,
    MatTooltipModule,
    MatDialogModule,
    MatButtonModule
    
  ],
  providers: [PostsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
