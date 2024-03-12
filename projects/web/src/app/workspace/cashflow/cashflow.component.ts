import { NgForm } from "@angular/forms";
import { Component, OnDestroy, OnInit } from "@angular/core";
import { DefaultProjectorFn, MemoizedSelector, Store } from "@ngrx/store";
import { Observable, Subscription } from "rxjs";

import { CashflowMode } from "../mode/mode.model";
import { IIncome } from "../data/model/income.model";
import { IOutcome } from "../data/model/outcome.model";
import { ISource } from "../adjustment/model/income.model";
import { ICategory } from "../adjustment/model/outcome.model";
import { ModeService } from "../mode/mode.service";
import { CashflowService } from "./cashflow.service";

import { IncomeSelectors } from "../data/store/income.selectors";
import { OutcomeSelectors } from "../data/store/outcome.selectors";
import { EnumerationSelectors } from "../adjustment/store/enumeration.selectors";
import { environment } from "projects/web/src/environments/environment";

@Component({
    templateUrl: "./cashflow.component.html",
    styleUrls: ["./cashflow.component.scss"],
})
export class CashflowComponent implements OnInit, OnDestroy {
    private _sub!: Subscription;

    public isIncome!: boolean;
    public isOutcome!: boolean;
    public formSubmitted!: boolean;

    public sources$!: Observable<ISource[]>;
    public categories$!: Observable<ICategory[]>;
    public descriptionMaxLength = environment.descriptionMaxLength;
    public sumMaxValue = environment.sumMaxValue;

    public incomesSelector!: MemoizedSelector<
        object,
        IIncome[],
        DefaultProjectorFn<IIncome[]>
    >;

    public outcomesSelector!: MemoizedSelector<
        object,
        IOutcome[],
        DefaultProjectorFn<IOutcome[]>
    >;

    constructor(
        private _incomeSelectors: IncomeSelectors,
        private _outcomeSelectors: OutcomeSelectors,
        private _enumerationSelectors: EnumerationSelectors,
        private _cashflowService: CashflowService,
        private _modeService: ModeService,
        private _store$: Store,
    ) {}

    public ngOnInit(): void {
        this.formSubmitted = false;
        this.incomesSelector = this._incomeSelectors.previewItems;
        this.outcomesSelector = this._outcomeSelectors.previewItems;

        this._sub = this._modeService.cashflowChange$.subscribe(mode => {
            this.isIncome = mode === CashflowMode.Income;
            this.isOutcome = mode === CashflowMode.Outcome;
            this.formSubmitted = false;
        });
        this.sources$ = this._store$.select(this._enumerationSelectors.sources);
        this.categories$ = this._store$.select(
            this._enumerationSelectors.categories,
        );
    }

    public ngOnDestroy(): void {
        if (this._sub) {
            this._sub.unsubscribe();
        }
    }

    public onSubmit(form: NgForm): void {
        this.formSubmitted = true;
        form.control.markAllAsTouched();
        if (this.isIncome) {
            form.controls.from.markAsDirty();
            form.controls.to.markAsDirty();
            if (form.valid) {
                this._cashflowService.addIncome(form);
                this.formSubmitted = false;
            }
        }
        if (this.isOutcome) {
            form.controls.date.markAsDirty();
            if (form.valid) {
                this._cashflowService.addOutcome(form);
                this.formSubmitted = false;
            }
        }
    }

    public onClear(form: NgForm): void {
        form.reset();
        this.formSubmitted = false;
    }

    public trackById(_index: number, item: ISource | ICategory): number {
        return item.id;
    }
}
