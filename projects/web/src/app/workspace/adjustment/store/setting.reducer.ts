import { Injectable } from "@angular/core";
import { ActionReducer, createReducer, on } from "@ngrx/store";

import { DialogMode } from "../model/dialog-mode.model";
import { SyncPeriod } from "../model/sync-period.model";
import { ISettingState } from "../model/state.model";
import * as fromActions from "./setting.actions";

@Injectable()
export class SettingReducer {
    public createReducer(): ActionReducer<ISettingState> {
        const initialState: ISettingState = {
            mode: DialogMode.None,
            syncPeriod: SyncPeriod.Never,
            error: null,
        };

        return createReducer(
            initialState,
            on(
                fromActions.save,
                fromActions.loginUser,
                fromActions.clearError,
                (state): ISettingState => ({
                    ...state,
                    mode: DialogMode.None,
                    error: null,
                }),
            ),
            on(
                fromActions.setWorkflow,
                (state, { payload }): ISettingState => ({
                    ...state,
                    syncPeriod: payload,
                }),
            ),
            on(
                fromActions.addMode,
                (state, { payload }): ISettingState => ({
                    ...state,
                    mode: state.mode | payload,
                }),
            ),
            on(
                fromActions.setMode,
                (state, { payload }): ISettingState => ({
                    ...state,
                    mode: payload,
                }),
            ),
            on(fromActions.setError, (state, { payload }): ISettingState => {
                return {
                    ...state,
                    mode: DialogMode.Error,
                    error: payload,
                };
            }),
            on(
                fromActions.clear,
                (): ISettingState => ({
                    mode: DialogMode.None,
                    syncPeriod: SyncPeriod.Never,
                    error: null,
                }),
            ),
        );
    }
}
