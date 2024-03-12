import { Component, OnDestroy, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { Observable, Subscription } from "rxjs";

import { CashflowMode } from "../mode/mode.model";
import { ModeService } from "../mode/mode.service";

import { IncomeSelectors } from "./store/income.selectors";
import { OutcomeSelectors } from "./store/outcome.selectors";
import { IncomeSelectors as IncomeDataSelectors } from "../data/store/income.selectors";
import { OutcomeSelectors as OutcomeDataSelectors } from "../data/store/outcome.selectors";
import * as fromIncomeActions from "./store/income.actions";
import * as fromOutcomeActions from "./store/outcome.actions";

@Component({
    templateUrl: "./chart.component.html",
    styleUrls: ["./chart.component.scss"],
})
export class ChartComponent implements OnInit, OnDestroy {
    private _sub!: Subscription;

    public chartMode!: "period" | "section";
    public isIncome!: boolean;
    public isOutcome!: boolean;

    public incomeYear$!: Observable<number | null>;
    public incomeYears$!: Observable<number[]>;
    public outcomeYear$!: Observable<number | null>;
    public outcomeYears$!: Observable<number[]>;

    constructor(
        private _incomeSelectors: IncomeSelectors,
        private _outcomeSelectors: OutcomeSelectors,
        private _incomeDataSelectors: IncomeDataSelectors,
        private _outcomeDataSelectors: OutcomeDataSelectors,
        private _modeService: ModeService,
        private _store$: Store,
    ) {}

    public ngOnInit(): void {
        this.chartMode = "period";
        this._sub = this._modeService.cashflowChange$.subscribe(mode => {
            this.isIncome = mode === CashflowMode.Income;
            this.isOutcome = mode === CashflowMode.Outcome;
        });

        this.incomeYear$ = this._store$.select(this._incomeSelectors.year);
        this.incomeYears$ = this._store$.select(
            this._incomeDataSelectors.years,
        );
        this.outcomeYear$ = this._store$.select(this._outcomeSelectors.year);
        this.outcomeYears$ = this._store$.select(
            this._outcomeDataSelectors.years,
        );
    }

    public ngOnDestroy(): void {
        if (this._sub) {
            this._sub.unsubscribe();
        }
    }

    public onIncomeYearSelect(year: number): void {
        this._store$.dispatch(fromIncomeActions.setYear({ payload: year }));
    }

    public onOutcomeYearSelect(year: number): void {
        this._store$.dispatch(fromOutcomeActions.setYear({ payload: year }));
    }

    public trackByIndex(index: number): number {
        return index;
    }
}
