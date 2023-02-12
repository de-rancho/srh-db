import { Component, OnInit } from '@angular/core';
import { findIana } from 'windows-iana';
import * as MicrosoftGraph from '@microsoft/microsoft-graph-types';

import { AuthService } from '../auth.service';
import { GraphService } from '../graph.service';
import { AlertsService } from '../alerts.service';
import { zonedTimeToUtc } from 'date-fns-tz/esm';
import { startOfWeek } from 'date-fns/esm';
import { endOfWeek } from 'date-fns/esm';
import * as moment from 'moment-timezone';


@Component({
    selector: 'app-calendar',
    templateUrl: './calendar.component.html',
    styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {

    public events?: MicrosoftGraph.Event[];

    constructor(
        private authService: AuthService,
        private graphService: GraphService,
        private alertsService: AlertsService) {
    }

    async ngOnInit(): Promise<void> {
        // Convert the user's timezone to IANA format
        const ianaName = findIana(this.authService.user?.timeZone ?? 'UTC');
        // tslint:disable-next-line:no-non-null-assertion
        const timeZone = ianaName![0].valueOf() || this.authService.user?.timeZone || 'UTC';

        // Get midnight on the start of the current week in the user's timezone,
        // but in UTC. For example, for Pacific Standard Time, the time value would be
        // 07:00:00Z
        const now = new Date();
        const weekStart = zonedTimeToUtc(startOfWeek(now), timeZone);
        const weekEnd = zonedTimeToUtc(endOfWeek(now), timeZone);


        this.events = await this.graphService.getCalendarView(
            weekStart.toISOString(),
            weekEnd.toISOString(),
            this.authService.user?.timeZone ?? 'UTC');

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
        } catch (error) {
            this.alertsService.addError('DateTimeTimeZone conversion error', JSON.stringify(error));
            return '';
        }
    }
}
