import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormCoberturaComponent } from './form-cobertura.component';

describe('FormCoberturaComponent', () => {
  let component: FormCoberturaComponent;
  let fixture: ComponentFixture<FormCoberturaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormCoberturaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormCoberturaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
