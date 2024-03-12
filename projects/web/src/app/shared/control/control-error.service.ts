import { Injectable } from "@angular/core";
import { AbstractControl } from "@angular/forms";
import { environment } from "projects/web/src/environments/environment";
import * as _ from "lodash";

@Injectable()
export class ControlErrorService {
    private _namesScheme: { [key: string]: string } = {
        email: "Email",
        password: "Password",
        passwordConfirm: "Password confirm",
    };

    public getErrorMessages(name: string, value: AbstractControl): string[] {
        const messages: string[] = [];
        if (value.touched && value.invalid && value.errors) {
            const fullName =
                name in this._namesScheme ? this._namesScheme[name] : "-";
            _.keys(value.errors).forEach(error => {
                const message = this.getMessage(error, fullName);
                if (message) {
                    messages.push(message);
                }
            });
        }
        return messages;
    }

    private getMessage(error: string, name: string): string | null {
        const length = environment.passwordMinLength;
        switch (error) {
            case "required":
                return `${name} field is required!`;
            case "email":
                return "The email is invalid!";
            case "minlength":
                return `The password is too short (min ${length} signs)!`;
            case "notequal":
                return "The passwords are not equal!";
            default:
                return "An unknown error has occurred!";
        }
    }
}
