import { NgModule } from "@angular/core";
import { SharedModule } from "../../shared/shared.module";
import { WorkspaceSharedModule } from "../shared/workspace-shared.module";
import { WorkspaceListModule } from "../shared/list/workspace-list.module";

import { CashflowService } from "./cashflow.service";
import { CashflowComponent } from "./cashflow.component";

@NgModule({
    declarations: [CashflowComponent],
    imports: [
        SharedModule,
        WorkspaceSharedModule,
        WorkspaceListModule,
    ],
    exports: [CashflowComponent],
    providers: [CashflowService],
})
export class CashflowModule {}
