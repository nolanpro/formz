import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { AuthService } from '../auth.service'
import { Observable } from 'rxjs/Observable'

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  @Output() createPerson = new EventEmitter();
  @Output() signOut = new EventEmitter();

  myForm: FormGroup;

  constructor(private formBuilder: FormBuilder, public auth: AuthService) { }

  ngOnInit() {
    this.myForm = this.formBuilder.group({
      firstname: ['', Validators.required],
      lastname: ['']
    })
  }

  submit(): void {
    this.createPerson.emit(this.myForm.value)
  }
}
