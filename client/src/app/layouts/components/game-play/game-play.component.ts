import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { AlertMsgService } from '../../../services/alert-msg/alert-msg.service';
import { GameService } from '../../../services/game/game.service';
import { Game } from 'src/app/models/Game';

@Component({
  selector: 'app-game-play',
  templateUrl: './game-play.component.html',
  styleUrls: ['./game-play.component.css']
})
export class GamePlayComponent implements OnInit {

  size = 9;
  goban = new Array();
  color = 'b';
  game: Game = {
    id: null,
    label: "",
    white: null,
    black: null,
    komi: null,
    rules: "japanese",
    size: "19x19",
  };

  constructor(
    private _route: ActivatedRoute,
    private _alertMsgService: AlertMsgService,
    private _gameService: GameService
  ) { }

  ngOnInit(): void {
    const gameId = +this._route.snapshot.paramMap.get('gameId');
    this._gameService.getGame(gameId).subscribe(game => {
      console.log(game);
      this.game = game;
    },
    err => {
      // console.log(err.error.error);
      if (err.error.error) {
        this._alertMsgService.addAlert({
          message: err.error.error,
          type: 'danger'
        });
      }

    })

    // console.log(this.goban);
    for (let x = 0; x < this.size; x++) {
      let line = new Array();
      for (let y = 0; y < this.size; y++) {
        line.push('')
      }
      this.goban.push(line)
    }
  }

  playCase(x, y): void {
    console.log(x, y, this.goban[x][y]);
    if (this.goban[x][y] == '') {
      this.goban[x][y] = this.color;

      if (this.color == 'b') {
        this.color = 'w';
      } else {
        this.color = 'b';
      }
    } else {
      this._alertMsgService.addAlert({
        message: "Il y a déjà une pierre à cet endroit là !",
        type: "danger"
      })
    }
  }

}
