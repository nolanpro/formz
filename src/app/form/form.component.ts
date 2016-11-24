import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  @Output() createPerson = new EventEmitter();
  @Output() signOut = new EventEmitter();

  myForm: FormGroup;

  constructor( private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.myForm = this.formBuilder.group({
      firstname: ['', Validators.required],
      lastname: ['']
    })
  }

  signOutClick() {
    console.log("EMITTING SIGNOUT")
    this.signOut.emit();
  }

  submit(): void {
    this.createPerson.emit(this.myForm.value)
  }
}
