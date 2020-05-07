import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './layouts/components/login/login.component';
import { BaseComponent } from './layouts/base/base.component';
import { GamesComponent } from './layouts/components/games/games.component';
import { GamePlayComponent } from './layouts/components/game-play/game-play.component';
import { GameAddComponent } from './layouts/components/game-add/game-add.component';
import { HomeComponent } from './layouts/components/home/home.component';

import { AuthGuard } from './guard/auth.guard';


const routes: Routes = [{
  path: '',
  component: BaseComponent,
  children: [{
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
   },{
    path:'home',
    component: HomeComponent
  },{
    path: 'login',
    component: LoginComponent
  },{
    path: 'games',
    component: GamesComponent,
    canActivate: [AuthGuard],
  },{
    path: 'game-play/:gameId',
    component: GamePlayComponent,
    canActivate: [AuthGuard],
  },{
    path: 'game-add',
    component: GameAddComponent,
    canActivate: [AuthGuard],
  }]
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
