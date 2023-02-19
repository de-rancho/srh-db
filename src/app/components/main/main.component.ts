import { Component, OnInit } from '@angular/core';
import { ConnectionService } from '../../services/connection.service';
import { Degree } from '../../model/degree';
import { Module } from '../../model/module';
import { DateAdapter } from '@angular/material/core';

@Component({
    selector: 'srh-main',
    templateUrl: './main.component.html',
    styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {


    constructor(protected s: ConnectionService, private dateAdapter: DateAdapter<Date>) {
        this.dateAdapter.setLocale('de-DE');
    }

    protected modules: Module[];
    protected currentDegree: Degree;


    ngOnInit(): void {
        this.s.getAllModules().subscribe((value) => this.modules = value);

    }


    changeCurrentDegree(emittedDegree: Degree): void {
        this.currentDegree = emittedDegree;
    }
}
