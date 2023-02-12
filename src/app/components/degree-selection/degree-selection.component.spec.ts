import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DegreeSelectionComponent } from './degree-selection.component';

describe('DegreeSelectionComponent', () => {
  let component: DegreeSelectionComponent;
  let fixture: ComponentFixture<DegreeSelectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DegreeSelectionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DegreeSelectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
