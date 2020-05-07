import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-base',
  templateUrl: './base.component.html',
  styleUrls: ['./base.component.css']
})
export class BaseComponent implements OnInit {

  constructor(
    public authService : AuthService,
    private _router: Router
  ) { }

  ngOnInit(): void {
  }

  logout(): void {
    this.authService.logout();
    this._router.navigate( ['/']);
  }

}
