import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { BaseComponent } from './base.component';
import { LoginComponent } from '../components/login/login.component';
import { GamesComponent } from '../components/games/games.component';
import { HomeComponent } from '../components/home/home.component';
import { GamePlayComponent } from '../components/game-play/game-play.component';
import { AlertMsgComponent } from '../components/alert-msg/alert-msg.component';
import { GameAddComponent } from '../components/game-add/game-add.component';

@NgModule({
  declarations: [
    BaseComponent,
    LoginComponent,
    GamesComponent,
    HomeComponent,
    AlertMsgComponent,
    GamePlayComponent,
    GameAddComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule
  ]
})
export class BaseModule { }
