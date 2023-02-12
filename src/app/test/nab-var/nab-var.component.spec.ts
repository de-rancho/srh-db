import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NabVarComponent } from './nab-var.component';

describe('NabVarComponent', () => {
  let component: NabVarComponent;
  let fixture: ComponentFixture<NabVarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NabVarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NabVarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
