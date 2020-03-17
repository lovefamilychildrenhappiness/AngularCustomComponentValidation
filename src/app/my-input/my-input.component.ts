import { Component, Input, forwardRef  } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, NG_VALIDATORS, FormControl, ValidationErrors, Validator } from '@angular/forms';

@Component({
  selector: 'app-my-input',
  templateUrl: './my-input.component.html',
  styleUrls: ['./my-input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => MyInputComponent),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => MyInputComponent),
      multi: true,
    }
  ]
})
export class MyInputComponent implements ControlValueAccessor  {
  private validationError: boolean;
  private value: string;

  // the method set in registerOnChange, it is just 
  // a placeholder for a method that takes one parameter, 
  // we use it to emit changes back to the form
  private propagateChange = (_: any) => { };
  
  onTouch: () => void;

  // this is the initial value set to the component
  writeValue(value: string): void {
    if(value){
      this.value = value;
    } else {
      this.value = '';
    }
  }

  // registers 'fn' that will be fired when changes are made
  // this is how we emit the changes back to the form
  registerOnChange(fn: any): void {
    this.propagateChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }

  // not used
  setDisabledState?(isDisabled: boolean): void {}

  // returns null when valid else the validation object 
  // in this case we're checking if the json parsing has 
  // passed or failed from the onChange method
  validate(control: FormControl): ValidationErrors | null {
    if(!this.validationError){
      return null
    } else {
      return { required: true };
    }
  }

  // this is a method called when input values change. this is a method not part of the ControlValueAccessor interface
  private onChange(val) {

    if(val.length > 0) {
        this.value = val
        this.validationError = false;
    } else {
        this.validationError = true;
    }

    // update the form
    this.propagateChange(val);
  }
}
