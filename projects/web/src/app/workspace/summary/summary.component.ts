import { NgForm } from "@angular/forms";
import { Component, OnDestroy, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { Observable, Subscription } from "rxjs";

import { CashflowMode } from "../mode/mode.model";
import { ISource } from "../adjustment/model/income.model";
import { ICategory } from "../adjustment/model/outcome.model";
import { ModeService } from "../mode/mode.service";
import { SummaryService } from "./summary.service";

import { IncomeSelectors } from "./store/income.selectors";
import { OutcomeSelectors } from "./store/outcome.selectors";
import { EnumerationSelectors } from "../adjustment/store/enumeration.selectors";
import * as _ from "lodash";

@Component({
    templateUrl: "./summary.component.html",
    styleUrls: ["./summary.component.scss"],
})
export class SummaryComponent implements OnInit, OnDestroy {
    private _subs: Subscription[] = [];

    public isIncome!: boolean;
    public isOutcome!: boolean;

    public incomeFrom: Date | null = null;
    public incomeTo: Date | null = null;
    public sourceId: number | null = null;

    public outcomeFrom: Date | null = null;
    public outcomeTo: Date | null = null;
    public categoryId: number | null = null;

    public sources$!: Observable<ISource[]>;
    public categories$!: Observable<ICategory[]>;

    constructor(
        private _incomeSelectors: IncomeSelectors,
        private _outcomeSelectors: OutcomeSelectors,
        private _enumerationSelectors: EnumerationSelectors,
        private _summaryService: SummaryService,
        private _modeService: ModeService,
        private _store$: Store,
    ) {}

    public ngOnInit(): void {
        this._subs.push(
            this._modeService.cashflowChange$.subscribe(mode => {
                this.isIncome = mode === CashflowMode.Income;
                this.isOutcome = mode === CashflowMode.Outcome;
            }),
        );
        this._subs.push(
            this._store$
                .select(this._incomeSelectors.filter)
                .subscribe(data => {
                    this.incomeFrom = data.from;
                    this.incomeTo = data.to;
                    this.sourceId = data.sourceId;
                }),
        );
        this._subs.push(
            this._store$
                .select(this._outcomeSelectors.filter)
                .subscribe(data => {
                    this.outcomeFrom = data.from;
                    this.outcomeTo = data.to;
                    this.categoryId = data.categoryId;
                }),
        );
        this.sources$ = this._store$.select(this._enumerationSelectors.sources);
        this.categories$ = this._store$.select(
            this._enumerationSelectors.categories,
        );
    }

    public ngOnDestroy(): void {
        _.forEach(this._subs, sub => {
            if (sub) {
                sub.unsubscribe();
            }
        });
    }

    public onSubmit(form: NgForm): void {
        if (form.valid) {
            if (this.isIncome) {
                this._summaryService.setIncomeFilter(
                    this.incomeFrom,
                    this.incomeTo,
                    this.sourceId,
                );
            }
            if (this.isOutcome) {
                this._summaryService.setOutcomeFilter(
                    this.outcomeFrom,
                    this.outcomeTo,
                    this.categoryId,
                );
            }
        }
    }

    public onClear(form: NgForm): void {
        form.reset();
        this.onSubmit(form);
    }

    public trackById(_index: number, item: ISource | ICategory): number {
        return item.id;
    }
}
