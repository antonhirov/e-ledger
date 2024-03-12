import { Injectable } from "@angular/core";
import { ActionReducer, createReducer, on } from "@ngrx/store";
import { createEntityAdapter, EntityAdapter } from "@ngrx/entity";

import { IIncomeData } from "../model/income.model";
import { IIncomeState } from "../model/state.model";
import * as fromActions from "./income.actions";

@Injectable()
export class IncomeReducer {
    public createReducer(): ActionReducer<IIncomeState> {
        const adapter: EntityAdapter<IIncomeData> =
            createEntityAdapter<IIncomeData>({
                selectId: (income: IIncomeData) => income.id,
                sortComparer: false,
            });
        const initialState: IIncomeState = adapter.getInitialState({
            years: [],
        });

        return createReducer(
            initialState,
            on(
                fromActions.addIncome,
                (state, { payload }): IIncomeState =>
                    adapter.addOne(payload, state),
            ),
            on(
                fromActions.addIncomes,
                (state, { payload }): IIncomeState =>
                    adapter.addMany(payload, state),
            ),
            on(
                fromActions.setIncomes,
                (state, { payload }): IIncomeState =>
                    adapter.setAll(payload, state),
            ),
            on(
                fromActions.deleteIncome,
                (state, { payload }): IIncomeState =>
                    adapter.removeOne(payload, state),
            ),
            on(
                fromActions.deleteIncomes,
                (state, { payload }): IIncomeState =>
                    adapter.removeMany(payload, state),
            ),
            on(
                fromActions.setYears,
                (state, { payload }): IIncomeState => ({
                    ...state,
                    years: [...payload],
                }),
            ),
            on(
                fromActions.clear,
                (): IIncomeState => ({ ids: [], entities: {}, years: [] }),
            ),
        );
    }
}
