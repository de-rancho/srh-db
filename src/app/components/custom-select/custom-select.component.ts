import {
    AfterContentInit,
    AfterViewInit,
    Component,
    ElementRef,
    EventEmitter,
    HostBinding,
    Input,
    OnDestroy,
    OnInit,
    Optional,
    Output,
    Renderer2,
    Self,
    ViewChild
} from '@angular/core';
import { map, Observable, startWith, Subject } from 'rxjs';
import { ConnectionService } from '../../services/connection.service';
import { Degree } from '../../model/degree';
import { MatAutocomplete, MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { ControlValueAccessor, FormControl, NgControl } from '@angular/forms';
import { MatFormFieldControl } from '@angular/material/form-field';

@Component({
    selector: 'srh-custom-select',
    templateUrl: './custom-select.component.html',
    styleUrls: ['./custom-select.component.scss'],
    providers: [{provide: MatFormFieldControl, useExisting: CustomSelectComponent}]
})
export class CustomSelectComponent
    implements OnInit, AfterContentInit, AfterViewInit, OnDestroy, MatFormFieldControl<CustomSelectComponent>, ControlValueAccessor {


    @Input()
    get value(): any | null {
        console.log(this.val);
        return this.val;
    }

    set value(inputVal: string | null) {
        console.log(this.val);
        this.val = inputVal;
        this.stateChanges.next();
    }

    @Input()
    get placeholder(): string {
        return this.placeholderVal;
    }

    set placeholder(plh) {
        this.placeholderVal = plh;
        this.stateChanges.next();
    }

    @Input()
    get disabled(): boolean {
        return this.disabledVal;
    }

    get errorState(): boolean {
        return this.myControl.invalid && this.myControl.touched;
    }

    constructor(protected s: ConnectionService, @Optional() @Self() public ngControl: NgControl, private renderer2: Renderer2) {
        if (this.ngControl != null) {
            this.ngControl.valueAccessor = this;
        }
    }

    static nextId = 0;

    @ViewChild('icon', {read: ElementRef}) arrowIcon: ElementRef;
    @ViewChild('auto', {read: MatAutocomplete}) autoComplete: MatAutocomplete;

    private val: string;
    private placeholderVal: string;
    private disabledVal = false;

    readonly autofilled: boolean;
    readonly controlType: string;
    readonly empty: boolean;
    readonly focused = false;
    readonly shouldLabelFloat: boolean;
    readonly userAriaDescribedBy: string;
    readonly required: boolean;


    degrees: Degree[];

    @Output() selectionChanged = new EventEmitter<any>();

    myControl = new FormControl('');
    filteredOptions: Observable<Degree[]>;
    toHighlight = '';

    stateChanges = new Subject<void>();

    @HostBinding() id = `select-${CustomSelectComponent.nextId++}`;

    ngOnInit(): void {
        this.s.getAllDegrees().subscribe((degreeList) => {
            this.degrees = degreeList;

            this.filteredOptions = this.myControl.valueChanges.pipe(
                startWith(''),
                map((input) => this._filter(input || '')),
            );
        });
    }

    ngAfterContentInit(): void {
        if (this.ngControl && this.ngControl.control) {
            this.myControl = this.ngControl.control as FormControl;
        }
    }

    ngAfterViewInit(): void {
        this.autoComplete.opened.subscribe(() => this.renderer2.addClass(this.arrowIcon.nativeElement, 'rotate'));
        this.autoComplete.closed.subscribe(() => this.renderer2.removeClass(this.arrowIcon.nativeElement, 'rotate'));
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

    ngOnDestroy(): void {
        this.stateChanges.complete();
    }

    changeSelection($event: MatAutocompleteSelectedEvent): void {
        // console.log($event);
        this.selectionChanged.emit($event.option.value);
    }

    getOptionText(option: Degree): string {
        return option?.name;
    }

    onContainerClick(event: MouseEvent): void {
    }

    setDescribedByIds(ids: string[]): void {
    }

    registerOnChange(fn: any): void {
    }

    registerOnTouched(fn: any): void {
    }

    writeValue(obj: any): void {
    }
}
