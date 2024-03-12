import { Injectable } from "@angular/core";
import { NgForm } from "@angular/forms";
import { ControlErrorService } from "../shared/control/control-error.service";
import * as _ from "lodash";

@Injectable()
export class AuthErrorService {
    constructor(private _errorService: ControlErrorService) {}

    public getErrorMessages(
        form: NgForm,
        extraMessage: string | null,
    ): string[] {
        const messages: string[] = [];
        _.keys(form.controls).forEach(control => {
            this._errorService
                .getErrorMessages(control, form.controls[control])
                .forEach(message => messages.push(message));
        });
        if (extraMessage) {
            messages.push(extraMessage);
        }
        return messages;
    }
}
