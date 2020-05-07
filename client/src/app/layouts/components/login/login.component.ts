import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { User } from '../../../models/User';
import { AlertMessage } from '../../../models/AlertMessage';
import { AuthService } from '../../../services/auth/auth.service';
import { AlertMsgService } from '../../../services/alert-msg/alert-msg.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user: User = {
    id: null,
    label: "",
    email: "",
    password: ""
  };

  alertMessage: AlertMessage = {
    message: "",
    type: ""
  }

  constructor(
    private _authService : AuthService,
    private _router: Router,
    private _alertMsgService: AlertMsgService
  ) { }

  ngOnInit(): void {
  }

  submit(): void {
    // console.log(this.user);
    this._authService.loginUser(this.user).subscribe(
      res => {
        // console.log(res);
        localStorage.setItem('token', res);
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
