import { Component, OnDestroy, OnInit } from "@angular/core";
import { DefaultProjectorFn, MemoizedSelector } from "@ngrx/store";
import { TypedAction } from "@ngrx/store/src/models";
import { Subscription } from "rxjs";

import { CashflowMode } from "../../mode/mode.model";
import { IIncome } from "../../data/model/income.model";
import { IOutcome } from "../../data/model/outcome.model";
import { ModeService } from "../../mode/mode.service";

import { IncomeSelectors } from "../store/income.selectors";
import { OutcomeSelectors } from "../store/outcome.selectors";
import * as fromIncomeActions from "../store/income.actions";
import * as fromOutcomeActions from "../store/outcome.actions";

@Component({
    selector: "el-summary-content",
    templateUrl: "./content.component.html",
})
export class ContentComponent implements OnInit, OnDestroy {
    private _sub!: Subscription;

    public isIncome!: boolean;
    public isOutcome!: boolean;

    public incomeAction!: (props: { payload: number }) => {
        payload: number;
    } & TypedAction<string>;

    public incomesSelector!: MemoizedSelector<
        object,
        IIncome[],
        DefaultProjectorFn<IIncome[]>
    >;

    public incomePageSelector!: MemoizedSelector<
        object,
        number,
        DefaultProjectorFn<number>
    >;

    public incomeCountSelector!: MemoizedSelector<
        object,
        number,
        DefaultProjectorFn<number>
    >;

    public outcomeAction!: (props: { payload: number }) => {
        payload: number;
    } & TypedAction<string>;

    public outcomesSelector!: MemoizedSelector<
        object,
        IOutcome[],
        DefaultProjectorFn<IOutcome[]>
    >;

    public outcomePageSelector!: MemoizedSelector<
        object,
        number,
        DefaultProjectorFn<number>
    >;

    public outcomeCountSelector!: MemoizedSelector<
        object,
        number,
        DefaultProjectorFn<number>
    >;

    constructor(
        private _incomeSelectors: IncomeSelectors,
        private _outcomeSelectors: OutcomeSelectors,
        private _modeService: ModeService,
    ) {}

    public ngOnInit(): void {
        this._sub = this._modeService.cashflowChange$.subscribe(mode => {
            this.isIncome = mode === CashflowMode.Income;
            this.isOutcome = mode === CashflowMode.Outcome;
        });

        this.incomeAction = fromIncomeActions.selectPage;
        this.incomesSelector = this._incomeSelectors.pageItems;
        this.incomePageSelector = this._incomeSelectors.page;
        this.incomeCountSelector = this._incomeSelectors.pagesCount;

        this.outcomeAction = fromOutcomeActions.selectPage;
        this.outcomesSelector = this._outcomeSelectors.pageItems;
        this.outcomePageSelector = this._outcomeSelectors.page;
        this.outcomeCountSelector = this._outcomeSelectors.pagesCount;
    }

    public ngOnDestroy(): void {
        if (this._sub) {
            this._sub.unsubscribe();
        }
    }
}
