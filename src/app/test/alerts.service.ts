import { Injectable } from '@angular/core';
import { Alert } from './alert';

@Injectable({
    providedIn: 'root'
})
export class AlertsService {
    alerts: Alert[] = [];

    addError(message: string, debug?: string) {
        this.alerts.push({message, debug: debug ?? '', type: 'danger'});
    }

    addSuccess(message: string, debug?: string) {
        this.alerts.push({message, debug: debug ?? '', type: 'success'});
    }

    remove(alert: Alert) {
        this.alerts.splice(this.alerts.indexOf(alert), 1);
    }
}
