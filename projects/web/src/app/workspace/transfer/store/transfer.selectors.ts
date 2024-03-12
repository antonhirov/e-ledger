import { createSelector } from "@ngrx/store";
import { Injectable } from "@angular/core";

import { IncomeSelectors } from "../../data/store/income.selectors";
import { OutcomeSelectors } from "../../data/store/outcome.selectors";
import { EnumerationSelectors } from "../../adjustment/store/enumeration.selectors";

@Injectable()
export class TransferSelectors {
    constructor(
        private _incomeSelectors: IncomeSelectors,
        private _outcomeSelectors: OutcomeSelectors,
        private _enumerationSelectors: EnumerationSelectors,
    ) {}

    public incomes = createSelector(
        this._incomeSelectors.items,
        this._enumerationSelectors.sources,
        (items, sources) => {
            return { items, list: sources };
        },
    );

    public outcomes = createSelector(
        this._outcomeSelectors.items,
        this._enumerationSelectors.categories,
        (items, categories) => {
            return { items, list: categories };
        },
    );
}
