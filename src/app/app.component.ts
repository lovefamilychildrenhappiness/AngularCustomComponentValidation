import { Component } from '@angular/core';
import {FormGroup, FormBuilder} from '@angular/forms';

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
      result: [{"test123":"test456"}]
    })
  }
}
