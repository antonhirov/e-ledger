import { NgModule } from "@angular/core";

import { SharedModule } from "../../../shared/shared.module";
import { ListIncomeComponent } from "./list-income.component";
import { ListOutcomeComponent } from "./list-outcome.component";
import { ListService } from "./list.service";

@NgModule({
    declarations: [ListIncomeComponent, ListOutcomeComponent],
    imports: [SharedModule],
    exports: [ListIncomeComponent, ListOutcomeComponent],
    providers: [ListService],
})
export class WorkspaceListModule {}
