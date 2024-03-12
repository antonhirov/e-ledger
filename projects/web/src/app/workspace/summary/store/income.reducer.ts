import { Injectable } from "@angular/core";
import { ActionReducer, createReducer, on } from "@ngrx/store";

import { IncomeFilter } from "../model/income.model";
import { IIncomeState } from "../model/state.model";
import * as fromActions from "./income.actions";
import * as _ from "lodash";

@Injectable()
export class IncomeReducer {
    public createReducer(): ActionReducer<IIncomeState> {
        const initialState: IIncomeState = {
            filter: new IncomeFilter(),
            page: 0,
            ids: [],
        };

        return createReducer(
            initialState,
            on(fromActions.addIncome, (state, { payload }): IIncomeState => {
                const ids = [...state.ids];
                if (state.filter.process(payload)) {
                    ids.unshift(payload.id);
                }
                return { ...state, ids: ids };
            }),
            on(
                fromActions.deleteIncome,
                (state, { payload }): IIncomeState => ({
                    ...state,
                    ids: _.filter(state.ids, item => item !== payload),
                }),
            ),
            on(
                fromActions.setFilter,
                (state, { payload }): IIncomeState => ({
                    ...state,
                    filter: payload,
                }),
            ),
            on(
                fromActions.setPage,
                (state, { payload }): IIncomeState => ({
                    ...state,
                    page: payload,
                }),
            ),
            on(
                fromActions.setOutput,
                (state, { payload }): IIncomeState => ({
                    ...state,
                    ids: [...payload],
                }),
            ),
            on(
                fromActions.clear,
                (): IIncomeState => ({
                    filter: new IncomeFilter(),
                    page: 0,
                    ids: [],
                }),
            ),
        );
    }
}
