import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { DataModule } from "./data/data.module";
import { CashflowModule } from "./cashflow/cashflow.module";
import { SummaryModule } from "./summary/summary.module";
import { ChartModule } from "./chart/chart.module";
import { TransferModule } from "./transfer/transfer.module";
import { AdjustmentModule } from "./adjustment/adjustment.module";
import { ExitModule } from "./exit/exit.module";
import { WorkspaceRoutingModule } from "./workspace-routing.module";

import { WorkspaceComponent } from "./workspace.component";
import { PanelCashflowComponent } from "./panel/panel-cashflow.component";
import { PanelAdjustmentComponent } from "./panel/panel-adjustment.component";
import { PanelExitComponent } from "./panel/panel-exit.component";

import { ModeService } from "./mode/mode.service";
import { WorkspaceService } from "./workspace.service";

@NgModule({
    declarations: [
        WorkspaceComponent,
        PanelCashflowComponent,
        PanelAdjustmentComponent,
        PanelExitComponent,
    ],
    imports: [
        CommonModule,
        DataModule,
        CashflowModule,
        SummaryModule,
        ChartModule,
        TransferModule,
        AdjustmentModule,
        ExitModule,
        WorkspaceRoutingModule,
    ],
    providers: [ModeService, WorkspaceService],
})
export class WorkspaceModule {}
