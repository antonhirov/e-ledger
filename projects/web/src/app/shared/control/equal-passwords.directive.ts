import { Directive, Input } from "@angular/core";
import {
    AbstractControl,
    NG_VALIDATORS,
    ValidationErrors,
    Validator,
} from "@angular/forms";
import * as _ from "lodash";

@Directive({
    selector: "[elEqualPasswords]",
    providers: [
        {
            provide: NG_VALIDATORS,
            useExisting: PasswordValidatorDirective,
            multi: true,
        },
    ],
})
export class PasswordValidatorDirective implements Validator {
    @Input("elEqualPasswords")
    public targetName = "";

    public validate(control: AbstractControl): ValidationErrors | null {
        const target = control.root.get(this.targetName);
        const value = control.value;
        if (value && target && target.value) {
            if (value === target.value) {
                const errors = _.omit(target.errors, "notequal");
                target.setErrors(_.keys(errors).length ? errors : null);
            } else {
                if (this.targetName !== "password") {
                    target.setErrors(
                        _.set(target.errors || {}, "notequal", true),
                    );
                } else {
                    return { notequal: true };
                }
            }
        }
        return null;
    }
}
