import { Injectable } from "@angular/core";
import { ActionReducer, createReducer, on } from "@ngrx/store";
import { createEntityAdapter, EntityAdapter } from "@ngrx/entity";

import { IOutcomeData } from "../model/outcome.model";
import { IOutcomeState } from "../model/state.model";
import * as fromActions from "./outcome.actions";

@Injectable()
export class OutcomeReducer {
    public createReducer(): ActionReducer<IOutcomeState> {
        const adapter: EntityAdapter<IOutcomeData> =
            createEntityAdapter<IOutcomeData>({
                selectId: (outcome: IOutcomeData) => outcome.id,
                sortComparer: false,
            });
        const initialState: IOutcomeState = adapter.getInitialState({
            years: [],
        });

        return createReducer(
            initialState,
            on(
                fromActions.addOutcome,
                (state, { payload }): IOutcomeState =>
                    adapter.addOne(payload, state),
            ),
            on(
                fromActions.addOutcomes,
                (state, { payload }): IOutcomeState =>
                    adapter.addMany(payload, state),
            ),
            on(
                fromActions.setOutcomes,
                (state, { payload }): IOutcomeState =>
                    adapter.setAll(payload, state),
            ),
            on(
                fromActions.deleteOutcome,
                (state, { payload }): IOutcomeState =>
                    adapter.removeOne(payload, state),
            ),
            on(
                fromActions.deleteOutcomes,
                (state, { payload }): IOutcomeState =>
                    adapter.removeMany(payload, state),
            ),
            on(
                fromActions.setYears,
                (state, { payload }): IOutcomeState => ({
                    ...state,
                    years: [...payload],
                }),
            ),
            on(
                fromActions.clear,
                (): IOutcomeState => ({ ids: [], entities: {}, years: [] }),
            ),
        );
    }
}
