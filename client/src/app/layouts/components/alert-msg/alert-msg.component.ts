import { Component, OnInit } from '@angular/core';

import { AlertMessage } from '../../../models/AlertMessage';
import { AlertMsgService } from '../../../services/alert-msg/alert-msg.service';

@Component({
  selector: 'app-alert-msg',
  templateUrl: './alert-msg.component.html',
  styleUrls: ['./alert-msg.component.css']
})
export class AlertMsgComponent implements OnInit {

  alerts: AlertMessage[];

  constructor(
    private _alertMsgService: AlertMsgService
  ) { }

  ngOnInit(): void {
    this.getAlerts();
  }

  getAlerts(): void {
    this.alerts = this._alertMsgService.getAlerts();
  }

}
