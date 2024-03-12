import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";

import { IncomeFilter } from "./model/income.model";
import { OutcomeFilter } from "./model/outcome.model";
import * as fromIncomeActions from "./store/income.actions";
import * as fromOutcomeActions from "./store/outcome.actions";

@Injectable()
export class SummaryService {
    constructor(private _store$: Store) {}

    public setIncomeFilter(
        from: Date | null,
        to: Date | null,
        sourceId: number | null,
    ): void {
        this._store$.dispatch(
            fromIncomeActions.setFilter({
                payload: new IncomeFilter(
                    from ? from.toDate() : null,
                    to ? to.toDate() : null,
                    sourceId,
                ),
            }),
        );
    }

    public setOutcomeFilter(
        from: Date | null,
        to: Date | null,
        categoryId: number | null,
    ): void {
        this._store$.dispatch(
            fromOutcomeActions.setFilter({
                payload: new OutcomeFilter(
                    from ? from.toDate() : null,
                    to ? to.toDate() : null,
                    categoryId,
                ),
            }),
        );
    }
}
