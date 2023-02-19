import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ConnectionService } from '../../services/connection.service';
import { Degree } from '../../model/degree';
import { map, Observable, startWith } from 'rxjs';
import { FormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';

@Component({
    selector: 'srh-degree-selection',
    templateUrl: './degree-selection.component.html',
    styleUrls: ['./degree-selection.component.scss']
})
export class DegreeSelectionComponent implements OnInit {

    degrees: Degree[];

    @Output() e = new EventEmitter<any>();

    myControl = new FormControl('');
    filteredOptions: Observable<Degree[]>;
    toHighlight = '';

    constructor(protected s: ConnectionService) {
    }

    ngOnInit(): void {

        this.s.getAllDegrees().subscribe((degreeList) => {
            this.degrees = degreeList;

            this.filteredOptions = this.myControl.valueChanges.pipe(
                startWith(''),
                map((input) => this._filter(input || '')),
            );
        });
    }

    private _filter(value: string): Degree[] {
        if (typeof value === 'string') {
            const filterValue = value.toLowerCase();
            this.toHighlight = filterValue;
            return this.degrees.filter((degree) => {
                const all = degree.identifier + ' - ' + degree.name + ' - ' + degree.type;
                return all.toLowerCase().includes(filterValue);
            });
        }
    }


    changeSelection($event: MatAutocompleteSelectedEvent): void {
        this.e.emit($event.option.value);
    }

    getOptionText(option: Degree): string {
        return option.name;
    }
}
