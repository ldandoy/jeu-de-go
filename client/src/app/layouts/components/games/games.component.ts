import { Component, OnInit } from '@angular/core';

import { GameService } from '../../../services/game/game.service';
import { Game } from "../../../models/Game";

@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.css']
})
export class GamesComponent implements OnInit {

  games: Game[] = [];

  constructor(
    private _gameService: GameService
  ) { }

  ngOnInit(): void {
    this.getGames();
  }

  getGames(): void {
    this._gameService.getGames().subscribe(
      games => {
        // console.log(games);
        this.games = games;
      },
      err => {
        console.log(err);
        /*if (err.error.error) {
          this.alertMessage = {
            message: err.error.error,
            type: 'danger'
          }

          this._alertMsgService.addAlert(this.alertMessage);
        }*/
      }
    );
  }

}
