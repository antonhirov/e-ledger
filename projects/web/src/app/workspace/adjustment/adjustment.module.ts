import { InjectionToken, NgModule } from "@angular/core";
import { ActionReducerMap, StoreModule } from "@ngrx/store";
import { EffectsModule } from "@ngrx/effects";
import { SortableModule } from "../../../../../ngx-bootstrap/src/sortable/sortable.module";

import { SharedModule } from "../../shared/shared.module";
import { ControlSharedModule } from "../../shared/control/control-shared.module";
import { WorkspaceSharedModule } from "../shared/workspace-shared.module";

import { Feature } from "../../shared/store/app.model";
import { SettingUserEffects } from "./store/setting-user.effects";
import { SettingWorkflowEffects } from "./store/setting-workflow.effects";
import { EnumerationEffects } from "./store/enumeration.effects";

import { SettingDialog } from "./setting/dialog/setting.dialog";
import { SettingsComponent } from "./setting/setting.component";
import { AdjustmentComponent } from "./adjustment.component";
import { EnumerationsComponent } from "./enumeration/enumeration.component";

import { SettingService } from "./setting/setting.service";
import { SettingDialogService } from "./setting/setting-dialog.service";
import { AdjustmentService } from "./adjustment.service";
import { AdjustmentResponseService } from "./adjustment-response.service";
import { SettingSelectors } from "./store/setting.selectors";
import { EnumerationSelectors } from "./store/enumeration.selectors";

import { IAdjustmentState } from "./model/state.model";
import { SettingReducer } from "./store/setting.reducer";
import { EnumerationReducer } from "./store/enumeration.reducer";

const ADJUSTMENT_REDUCER = new InjectionToken<
    ActionReducerMap<IAdjustmentState>
>("Adjustment reducer");

@NgModule({
    declarations: [
        SettingDialog,
        SettingsComponent,
        AdjustmentComponent,
        EnumerationsComponent,
    ],
    imports: [
        SharedModule,
        ControlSharedModule,
        WorkspaceSharedModule,
        SortableModule.forRoot(),
        StoreModule.forFeature(Feature.Adjustment, ADJUSTMENT_REDUCER),
        EffectsModule.forFeature([
            SettingUserEffects,
            SettingWorkflowEffects,
            EnumerationEffects,
        ]),
    ],
    exports: [AdjustmentComponent],
    providers: [
        SettingService,
        SettingDialogService,
        AdjustmentService,
        AdjustmentResponseService,
        SettingSelectors,
        EnumerationSelectors,
        SettingReducer,
        EnumerationReducer,
        {
            provide: ADJUSTMENT_REDUCER,
            deps: [SettingReducer, EnumerationReducer],
            useFactory: (
                settingReducer: SettingReducer,
                enumerationReducer: EnumerationReducer,
            ): ActionReducerMap<IAdjustmentState> => ({
                setting: settingReducer.createReducer(),
                enumeration: enumerationReducer.createReducer(),
            }),
        },
    ],
})
export class AdjustmentModule {}
