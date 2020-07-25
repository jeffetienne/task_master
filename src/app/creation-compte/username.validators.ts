import { AbstractControl, ValidationErrors, AsyncValidator } from '@angular/forms';
import { CompteService } from '../compte.service';
import { Compte } from '../model/Compte';

export class UsernameValidators implements AsyncValidator {

    constructor(private compteService: CompteService){}

    validate(control: AbstractControl): Promise<ValidationErrors> | import("rxjs").Observable<ValidationErrors> {
        return new Promise((resolve, reject) => {
            this.compteService.getCompte(7)
                .subscribe(response => {
                    let compte: Compte = response.json();
                    if ((control.value as string)) {
                        if (compte.username === (control.value as string)) {
                            resolve({ mustBeUnique: true });
                        }
                        else
                            resolve(null);
                    }
                });
        });
    }
    registerOnValidatorChange?(fn: () => void): void {
        throw new Error("Method not implemented.");
    }

    static cannotContainSpace(control: AbstractControl): ValidationErrors | null {
        if ((control.value as string)) {
            if ((control.value as string).indexOf(' ') >= 0)
                return { cannotContainSpace: true };
        }

        return null;
    }

    

    static cannotStartWithNumber(control: AbstractControl): ValidationErrors | null {
        let valeur: string
        if ((control.value as string)) {
            valeur = (control.value as string);
            if (!isNaN(Number(valeur.charAt(0)))) {
                return { cannotStartWithNumber: true };
            }
        }
        return null;
    }
}