import { CompteService } from '../compte.service';
import { AbstractControl, ValidationErrors, NG_ASYNC_VALIDATORS, AsyncValidator, AsyncValidatorFn } from '@angular/forms';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Directive } from '@angular/core';

export function idMustBeUnique(compteService: CompteService): AsyncValidatorFn {
    return (control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> => {
        return compteService.getCompteByCode(control.value)
        .pipe(
            map(
                comptes => {
                  return ((comptes.json() && comptes.json().length > 0) || +control.value <= 0) ? {idMustBeUnique: true} : null;
                }
              )
        )
        
      };
}

@Directive({
    selector: '[idMustBeUnique][formControlName],[idMustBeUnique][formControl],[idMustBeUnique][ngModel]',
    providers: [{provide: NG_ASYNC_VALIDATORS, useExisting: IdMustBeUnique, multi: true}]
  })
  export class IdMustBeUnique implements AsyncValidator {
    constructor(private compteService: CompteService) {  }
  
    validate(control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {
       return idMustBeUnique(this.compteService)(control);
    }
  } 