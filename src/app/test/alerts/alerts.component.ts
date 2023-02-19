import { Component, OnInit } from '@angular/core';
import { AlertsService } from '../alerts.service';
import { Alert } from '../alert';

@Component({
  selector: 'srh-alerts',
  templateUrl: './alerts.component.html',
  styleUrls: ['./alerts.component.scss']
})
export class AlertsComponent implements OnInit {

  constructor(public alertsService: AlertsService) { }

  ngOnInit(): void {
  }

  close(alert: Alert): void {
    this.alertsService.remove(alert);
  }
}
