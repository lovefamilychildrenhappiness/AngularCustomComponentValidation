import { Component, Input, forwardRef  } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, NG_VALIDATORS, FormControl, Validator } from '@angular/forms';

@Component({
  selector: 'app-json-input',
  templateUrl: './json-input.component.html',
  styleUrls: ['./json-input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => JsonInputComponent),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => JsonInputComponent),
      multi: true,
    }
  ]
})
export class JsonInputComponent implements ControlValueAccessor  {
  private jsonString: string;
  private parseError: boolean;
  private data: any;

  // the method set in registerOnChange, it is just 
  // a placeholder for a method that takes one parameter, 
  // we use it to emit changes back to the form
  private propagateChange = (_: any) => { };
  
  // this is the initial value set to the component
  writeValue(obj: any): void {
    if (obj) {
      this.data = obj;
      // this will format it with 4 character spacing
      this.jsonString = JSON.stringify(this.data, undefined, 4); 
    }
  }

  // registers 'fn' that will be fired when changes are made
  // this is how we emit the changes back to the form
  registerOnChange(fn: any): void {
    this.propagateChange = fn;
  }

  // not used, used for touch input
  registerOnTouched(fn: any): void {}

  // not used
  setDisabledState?(isDisabled: boolean): void {}

  // returns null when valid else the validation object 
  // in this case we're checking if the json parsing has 
  // passed or failed from the onChange method
  validate(c: FormControl) {
    return (!this.parseError) ? null : {
      jsonParseError: {
          valid: false,
      },
    };
  }

  // this is a method called when input values change. this is a method not part of the ControlValueAccessor interface
  private onChange(event) {
    // get value from text area
    let newValue = event.target.value;
    try {
        // parse it to json
        this.data = JSON.parse(newValue);
        this.parseError = false;
    } catch (ex) {
        // set parse error if it fails
        this.parseError = true;
    }

    // update the form
    this.propagateChange(this.data);
  }
}
