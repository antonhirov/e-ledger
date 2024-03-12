import { Injectable } from "@angular/core";
import { ActionReducer, createReducer, on } from "@ngrx/store";

import { IEnumerationState } from "../model/state.model";
import * as fromActions from "./enumeration.actions";

@Injectable()
export class EnumerationReducer {
    public createReducer(): ActionReducer<IEnumerationState> {
        const initialState: IEnumerationState = {
            sources: [],
            categories: [],
        };

        return createReducer(
            initialState,
            on(
                fromActions.setEnums,
                (state, { payload }): IEnumerationState => ({
                    ...state,
                    sources: [...payload.sources],
                    categories: [...payload.categories],
                }),
            ),
            on(
                fromActions.refreshEnums,
                (state): IEnumerationState => ({
                    ...state,
                    sources: [...state.sources],
                    categories: [...state.categories],
                }),
            ),
            on(
                fromActions.clear,
                (): IEnumerationState => ({
                    sources: [],
                    categories: [],
                }),
            ),
        );
    }
}
