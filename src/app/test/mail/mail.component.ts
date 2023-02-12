import { Component, OnInit } from '@angular/core';
import * as MicrosoftGraph from '@microsoft/microsoft-graph-types';
import { AuthService } from '../auth.service';
import { GraphService } from '../graph.service';
import { AlertsService } from '../alerts.service';
import * as moment from 'moment-timezone';

@Component({
  selector: 'app-mail',
  templateUrl: './mail.component.html',
  styleUrls: ['./mail.component.scss']
})
export class MailComponent implements OnInit {

  public events?: any[];

  constructor(
      private authService: AuthService,
      private graphService: GraphService,
      private alertsService: AlertsService) {
  }

  async ngOnInit(): Promise<void> {
    this.events = await this.graphService.getMailView();
    // Temporary to display raw results
    this.alertsService.addSuccess('Events from Graph', JSON.stringify(this.events, null, 2));
  }

  formatDateTimeTimeZone(dateTime: MicrosoftGraph.DateTimeTimeZone | undefined | null): string {
    if (dateTime === undefined) {
      return '';
    }

    try {
      // Pass UTC for the time zone because the value
      // is already adjusted to the user's time zone
      return moment.tz(dateTime.dateTime, 'UTC').format();
    }
    catch (error) {
      this.alertsService.addError('DateTimeTimeZone conversion error', JSON.stringify(error));
      return '';
    }
  }
}
