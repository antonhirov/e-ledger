import { Injectable } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Store } from "@ngrx/store";

import { IncomeData } from "../data/model/income.model";
import { OutcomeData } from "../data/model/outcome.model";
import * as fromIncomeActions from "../data/store/income.actions";
import * as fromOutcomeActions from "../data/store/outcome.actions";

@Injectable()
export class CashflowService {
    constructor(private _store$: Store) {}

    public addIncome(form: NgForm): void {
        const value = form.value;
        const from = new Date(value.from);
        const to = new Date(value.to);
        const sum = parseFloat(value.incomeSum);
        const sourceId = parseInt(value.source);

        const fromDate = from.toDate();
        const toDate = to.toDate();

        if (fromDate <= toDate) {
            this._store$.dispatch(
                fromIncomeActions.addIncome({
                    payload: new IncomeData(fromDate, toDate, sum, sourceId),
                }),
            );
            form.reset();
        }
    }

    public addOutcome(form: NgForm): void {
        const value = form.value;
        const date = new Date(value.date);
        const sum = parseFloat(value.outcomeSum);
        const categoryId = parseInt(value.category);
        const description = value.description;

        this._store$.dispatch(
            fromOutcomeActions.addOutcome({
                payload: new OutcomeData(
                    date.toDate(),
                    sum,
                    categoryId,
                    description,
                ),
            }),
        );
        form.reset();
    }
}
