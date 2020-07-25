import { CompteService } from '../compte.service';
import { AbstractControl, ValidationErrors, NG_ASYNC_VALIDATORS, AsyncValidator, AsyncValidatorFn } from '@angular/forms';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Directive } from '@angular/core';

export function mustBeUnique(compteService: CompteService): AsyncValidatorFn {
    return (control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> => {
        return compteService.getCompteByUsername(control.value)
        .pipe(
            map(
                comptes => {
                  return (comptes.json() && comptes.json().length > 0) ? {mustBeUnique: true} : null;
                }
              )
        )
        
      };
}

@Directive({
    selector: '[mustBeUnique][formControlName],[mustBeUnique][formControl],[mustBeUnique][ngModel]',
    providers: [{provide: NG_ASYNC_VALIDATORS, useExisting: MustBeUnique, multi: true}]
  })
  export class MustBeUnique implements AsyncValidator {
    constructor(private compteService: CompteService) {  }
  
    validate(control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {
       return mustBeUnique(this.compteService)(control);
    }
  } 