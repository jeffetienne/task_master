import { AbstractControl, ValidationErrors } from '@angular/forms';

export class DeadlineValidators {

    constructor(){}

    static mustBePosteriorToToday(control: AbstractControl): ValidationErrors | null {
        if ((control.value as Date)) {
            if (new Date(control.value as Date) <= new Date()){
                return { mustBePosteriorToToday: true };
            }
                
        }

        return null;
    }
}