import { Injectable } from "@angular/core";
import { ActionReducer, createReducer, on } from "@ngrx/store";

import { OutcomeFilter } from "../model/outcome.model";
import { IOutcomeState } from "../model/state.model";
import * as fromActions from "./outcome.actions";
import * as _ from "lodash";

@Injectable()
export class OutcomeReducer {
    public createReducer(): ActionReducer<IOutcomeState> {
        const initialState: IOutcomeState = {
            filter: new OutcomeFilter(),
            page: 0,
            ids: [],
        };

        return createReducer(
            initialState,
            on(fromActions.addOutcome, (state, { payload }): IOutcomeState => {
                const ids = [...state.ids];
                if (state.filter.process(payload)) {
                    ids.unshift(payload.id);
                }
                return { ...state, ids: ids };
            }),
            on(
                fromActions.deleteOutcome,
                (state, { payload }): IOutcomeState => ({
                    ...state,
                    ids: _.filter(state.ids, item => item !== payload),
                }),
            ),
            on(
                fromActions.setFilter,
                (state, { payload }): IOutcomeState => ({
                    ...state,
                    filter: payload,
                }),
            ),
            on(
                fromActions.setPage,
                (state, { payload }): IOutcomeState => ({
                    ...state,
                    page: payload,
                }),
            ),
            on(
                fromActions.setOutput,
                (state, { payload }): IOutcomeState => ({
                    ...state,
                    ids: [...payload],
                }),
            ),
            on(
                fromActions.clear,
                (): IOutcomeState => ({
                    filter: new OutcomeFilter(),
                    page: 0,
                    ids: [],
                }),
            ),
        );
    }
}
