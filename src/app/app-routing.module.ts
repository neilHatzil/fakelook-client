import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddPostComponent } from './components/add-post/add-post.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { MapComponent } from './components/map/map.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { TimelineComponent } from './components/timeline/timeline.component';
import { GuardianGuard } from './guard/guardian.guard';



const routes: Routes = [
  {
    path: `Home`,
    component: HomeComponent,
    //canActivate: [GuardianGuard],
    children: [
      {
        path: 'Map',
        component: MapComponent
      },
      {
        path: 'Timeline',
        component: TimelineComponent
      },
      {
        path: 'AddPost',
        component: AddPostComponent
      },]
      
  },
  { path: `SignUp`, component: SignUpComponent },
  { path: `Login`, component: LoginComponent },
  { path: ``, component: HomeComponent },
  { path: `**`, component: HomeComponent },];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
