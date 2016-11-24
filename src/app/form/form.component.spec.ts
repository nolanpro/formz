/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormComponent } from './form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

describe('FormComponent', () => {
  let component: FormComponent;
  let fixture: ComponentFixture<FormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormComponent ],
      imports: [ FormsModule, ReactiveFormsModule ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('validates that firstname is present', () => {
    component.myForm.setValue({firstname: '', lastname: 'tester'});
    expect(component.myForm.valid).toEqual(false);
    component.myForm.setValue({firstname: 'testing', lastname: 'tester'});
    expect(component.myForm.valid).toEqual(true);
  });

  it('emits the form on submit', () => {
    let expected: Object = { firstname: 'foo', lastname: 'bar' };
    component.createPerson.subscribe(formValue => {
      expect(formValue).toEqual(expected);
    });
    component.myForm.setValue(expected);
    fixture.nativeElement.querySelector('button').click();
  });
});
