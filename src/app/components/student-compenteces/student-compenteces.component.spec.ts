import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentCompentecesComponent } from './student-compenteces.component';

describe('StudentCompentecesComponent', () => {
  let component: StudentCompentecesComponent;
  let fixture: ComponentFixture<StudentCompentecesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudentCompentecesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudentCompentecesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
