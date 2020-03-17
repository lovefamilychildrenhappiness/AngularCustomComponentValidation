import { Component } from '@angular/core';
import {FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public result = {};
  public reactiveForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.reactiveForm = this.fb.group({
      result: ['', Validators.required]
    })
  }

  private nextStep(event){
    // How do I dynamically change the class of the form control so I can change the style if formControl invalid when clicking the nextStep button
    // pseudocode:
    // if( !this.reactiveForm.controls['result'].valid ){
    //  this.reactiveForm.controls['result'].addClass('failed-validation');
    // }

    return false;
  }
}
