import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormConfirmacionComponent } from './form-confirmacion.component';

describe('FormConfirmacionComponent', () => {
  let component: FormConfirmacionComponent;
  let fixture: ComponentFixture<FormConfirmacionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormConfirmacionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormConfirmacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
