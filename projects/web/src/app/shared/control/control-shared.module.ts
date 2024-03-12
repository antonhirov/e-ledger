import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

import { PasswordValidatorDirective } from "./equal-passwords.directive";
import { ControlErrorService } from "./control-error.service";

@NgModule({
    declarations: [PasswordValidatorDirective],
    imports: [CommonModule],
    exports: [PasswordValidatorDirective],
    providers: [ControlErrorService],
})
export class ControlSharedModule {}
