import { ValidatorFn, AbstractControl } from '@angular/forms';

export default class Utils {
  static emptySpaceValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: boolean } | null => {
      const errors: any = {};
      if (control.value && !control.value.trim()) {
        errors.numbers = true;
        return errors;
      }
      return null;
    };
  }
}
