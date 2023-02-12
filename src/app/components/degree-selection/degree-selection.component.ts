import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ConnectionService } from '../../services/connection.service';
import { Degree } from '../../model/degree';
import { Module } from '../../model/module';
import { MatSelectChange } from '@angular/material/select';

@Component({
    selector: 'app-degree-selection',
    templateUrl: './degree-selection.component.html',
    styleUrls: ['./degree-selection.component.scss']
})
export class DegreeSelectionComponent implements OnInit {

    degrees: Degree[];

    @Output() e = new EventEmitter<any>();

    constructor(protected s: ConnectionService) {
    }

    ngOnInit(): void {

        this.s.getAllDegrees().subscribe((value) => {
            console.log(value);
            console.log(typeof value);
            return this.degrees = value;
        });
    }

    changeSelection($event: MatSelectChange): void {
        this.e.emit($event);
    }
}
