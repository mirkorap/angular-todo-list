/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-empty-function */

import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { MatButtonToggleChange } from '@angular/material/button-toggle';

type OnChange = (color: string) => void;
type OnTouched = () => void;

@Component({
  selector: 'app-color-picker',
  templateUrl: './color-picker.component.html',
  styleUrls: ['./color-picker.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: ColorPickerComponent
    }
  ]
})
export class ColorPickerComponent implements ControlValueAccessor {
  @Input() colors: string[] = [];
  @Input() selected = '';

  touched = false;
  disabled = false;

  onChange: OnChange = (_color: string): void => {};
  onTouched: OnTouched = () => {};

  onColorChange(event: MatButtonToggleChange): void {
    this.markAsTouched();
    if (!this.disabled) {
      this.selected = event.value;
      this.onChange(event.value);
    }
  }

  writeValue(color: string): void {
    this.selected = color;
  }

  registerOnChange(onChange: OnChange): void {
    this.onChange = onChange;
  }

  registerOnTouched(onTouched: OnTouched): void {
    this.onTouched = onTouched;
  }

  markAsTouched(): void {
    if (!this.touched) {
      this.onTouched();
      this.touched = true;
    }
  }

  setDisabledState(disabled: boolean): void {
    this.disabled = disabled;
  }
}
