import { NgModule } from "@angular/core";
import { SharedModule } from "../../shared/shared.module";
import { WorkspaceSharedModule } from "../shared/workspace-shared.module";
import { TransferComponent } from "./transfer.component";
import { ExportComponent } from "./export/export.component";
import { ImportComponent } from "./import/import.component";

import { ExportService } from "./export/export.service";
import { ExportIncomeService } from "./export/export-income.service";
import { ExportOutcomeService } from "./export/export-outcome.service";
import { ImportService } from "./import/import.service";
import { ImportIncomeService } from "./import/import-income.service";
import { ImportOutcomeService } from "./import/import-outcome.service";
import { TransferSelectors } from "./store/transfer.selectors";

@NgModule({
    declarations: [TransferComponent, ExportComponent, ImportComponent],
    imports: [SharedModule, WorkspaceSharedModule],
    exports: [TransferComponent],
    providers: [
        ExportService,
        ExportIncomeService,
        ExportOutcomeService,
        ImportService,
        ImportIncomeService,
        ImportOutcomeService,
        TransferSelectors,
    ],
})
export class TransferModule {}
