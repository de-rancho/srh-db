import { Component, OnInit } from '@angular/core';
import { ConnectionService } from '../../services/connection.service';
import { Degree } from '../../model/degree';
import { Module } from '../../model/module';
import { $ } from 'protractor';

@Component({
    selector: 'app-main',
    templateUrl: './main.component.html',
    styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

    constructor(protected s: ConnectionService) {
    }

    modules: Module[];
    currentDegree: Degree;

    ngOnInit(): void {
        this.s.getAllModules().subscribe((value) => this.modules = value);
    }

    changeSelection($event: any): void {
        console.log($event)
        this.currentDegree = $event;
    }

    method(): void {
        console.log('Test');

        // this.s.getAllModules();
    }
}
