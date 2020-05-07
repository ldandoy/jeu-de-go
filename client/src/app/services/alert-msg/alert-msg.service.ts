import { Injectable } from '@angular/core';

import { AlertMessage } from '../../models/AlertMessage';

@Injectable({
  providedIn: 'root'
})
export class AlertMsgService {

  alerts: AlertMessage[] = [];

  constructor() { }

  getAlerts(): AlertMessage[] {
    return this.alerts;
  }

  addAlert(alert: AlertMessage): void {
    this.alerts.push(alert);
  }
}
