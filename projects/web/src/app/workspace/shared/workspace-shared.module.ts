import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { NgSelectModule } from "@ng-select/ng-select";
import { BsDatepickerModule } from "ngx-bootstrap/datepicker";
import {
    DatepickerDirective,
    DatepickerInputDirective,
} from "./directives/datepicker.directive";

@NgModule({
    declarations: [DatepickerDirective, DatepickerInputDirective],
    imports: [
        CommonModule,
        FormsModule,
        NgSelectModule,
        BsDatepickerModule.forRoot(),
    ],
    exports: [
        FormsModule,
        NgSelectModule,
        BsDatepickerModule,
        DatepickerDirective,
        DatepickerInputDirective,
    ],
})
export class WorkspaceSharedModule {}
