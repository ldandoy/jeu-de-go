import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { Game } from '../../models/Game';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  private _url = "http://127.0.0.1:3000/api";

  constructor(
    private http: HttpClient
  ) { }

  getGames(): Observable<Game[]> {
    return this.http.get<Game[]>(this._url + "/games");
  }

  addGame(game: Game): Observable<Game> {
    return this.http.post<Game>(this._url + "/games", game);
  }

  getGame(gameId): Observable<Game> {
    return this.http.get<Game>(this._url + "/games/"+gameId);
  }
}
