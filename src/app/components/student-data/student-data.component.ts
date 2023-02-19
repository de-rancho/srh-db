import { AfterViewInit, Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Degree } from '../../model/degree';

@Component({
    selector: 'srh-student-data',
    templateUrl: './student-data.component.html',
    styleUrls: ['./student-data.component.scss']
})
export class StudentDataComponent implements OnInit, AfterViewInit {

    @Output() degreeEmitter = new EventEmitter<Degree>();

    protected currentDate = new Date();
    protected startDateForBirthDate = new Date(2000, 1, 1);
    protected studentInfoGroup: FormGroup;

    protected currentDegree: Degree;

    constructor() {
    }

    ngOnInit(): void {
        this.studentInfoGroup = this.buildStudentInfoGroup();
        this.studentInfoGroup.markAllAsTouched();
    }

    ngAfterViewInit(): void {
        this.studentInfoGroup.valueChanges.subscribe(() =>
            console.log(this.studentInfoGroup.get('dateOfBirth'))
        );
    }

    changeSelection(selectedDegree: Degree): void {
        this.currentDegree = selectedDegree;
        this.degreeEmitter.emit(selectedDegree);
        this.studentInfoGroup.get('ectsNeeded').setValue(this.currentDegree.ectsNeeded);
        this.studentInfoGroup.get('numberOfModules').setValue(this.currentDegree.moduleList.moduleListModules.length);
    }

    private buildStudentInfoGroup(): FormGroup {
        return new FormGroup({
            name: new FormControl(),
            registrationNumber: new FormControl(),
            dateOfBirth: new FormControl(this.startDateForBirthDate),
            degree: new FormControl(this.currentDegree),
            ectsNeeded: new FormControl(),
            numberOfModules: new FormControl(),
            checkedOn: new FormControl(this.currentDate),
            checkedBy: new FormControl()
        });
    }
}
