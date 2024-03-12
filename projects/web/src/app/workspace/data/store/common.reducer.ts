import { Injectable } from "@angular/core";
import { ActionReducer, createReducer, on } from "@ngrx/store";

import { ICommonState } from "../model/state.model";
import * as fromActions from "./common.actions";

@Injectable()
export class CommonReducer {
    public createReducer(): ActionReducer<ICommonState> {
        const initialState: ICommonState = {
            isUnsaved: false,
            error: null,
        };

        return createReducer(
            initialState,
            on(
                fromActions.setSaved,
                (state): ICommonState => ({
                    ...state,
                    isUnsaved: false,
                }),
            ),
            on(
                fromActions.setUnsaved,
                (state): ICommonState => ({
                    ...state,
                    isUnsaved: true,
                }),
            ),
            on(
                fromActions.setStatus,
                (state, { payload }): ICommonState => ({
                    ...state,
                    isUnsaved: payload,
                }),
            ),
            on(
                fromActions.setError,
                (state, { payload }): ICommonState => ({
                    ...state,
                    error: payload,
                }),
            ),
            on(
                fromActions.clear,
                (): ICommonState => ({
                    isUnsaved: false,
                    error: null,
                }),
            ),
        );
    }
}
