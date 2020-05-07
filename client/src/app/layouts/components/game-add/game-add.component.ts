import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Game } from '../../../models/Game';
import { AlertMessage } from '../../../models/AlertMessage';
import { GameService } from '../../../services/game/game.service';
import { AlertMsgService } from '../../../services/alert-msg/alert-msg.service';

@Component({
  selector: 'app-game-add',
  templateUrl: './game-add.component.html',
  styleUrls: ['./game-add.component.css']
})
export class GameAddComponent implements OnInit {

  game: Game = {
    id: null,
    label: "",
    white: null,
    black: null,
    komi: null,
    rules: "japanese",
    size: "19x19",
  };

  color = "black";

  alertMessage: AlertMessage = {
    message: "",
    type: ""
  }

  constructor(
    private _gameService: GameService,
    private _router: Router,
    private _alertMsgService: AlertMsgService,
  ) { }

  ngOnInit(): void {
  }

  saveGame(): void {
    console.log(this.game);

    // Set the player of the color choosen
    if (this.color == "black") {
      this.game.black = 1;
    } else {
      this.game.white = 1;
    }

    // Set the komi depends on type rules
    if (this.game.rules == "japanese") {
      this.game.komi = 5;
    } else {
      this.game.komi = 7;
    }

    console.log(this.game);

    this._gameService.addGame(this.game).subscribe(
      res => {
        // console.log(res);
        this._router.navigate( ['/games']);
      },
      err => {
        // console.log(err.error.error);
        if (err.error.error) {
          this.alertMessage = {
            message: err.error.error,
            type: 'danger'
          }

          this._alertMsgService.addAlert(this.alertMessage);
        }

      }
    );
  }

}
