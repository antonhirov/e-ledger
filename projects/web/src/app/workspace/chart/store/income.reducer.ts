import { Injectable } from "@angular/core";
import { ActionReducer, createReducer, on } from "@ngrx/store";

import { IState } from "../model/state.model";
import * as fromActions from "./income.actions";

@Injectable()
export class IncomeReducer {
    public createReducer(): ActionReducer<IState> {
        const initialState: IState = {
            year: null,
            points: [],
            sections: [],
        };

        return createReducer(
            initialState,
            on(
                fromActions.setYear,
                (state, { payload }): IState => ({
                    ...state,
                    year: payload,
                }),
            ),
            on(
                fromActions.setPoints,
                (state, { payload }): IState => ({
                    ...state,
                    points: [...payload],
                }),
            ),
            on(
                fromActions.setSections,
                (state, { payload }): IState => ({
                    ...state,
                    sections: [...payload],
                }),
            ),
            on(
                fromActions.clear,
                (): IState => ({ year: null, points: [], sections: [] }),
            ),
        );
    }
}
