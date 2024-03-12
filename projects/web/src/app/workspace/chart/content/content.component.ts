import { Component, Input, OnDestroy, OnInit } from "@angular/core";
import { DefaultProjectorFn, MemoizedSelector } from "@ngrx/store";
import { Subscription } from "rxjs";

import { IChartPoint, IChartSection } from "../model/chart.model";
import { CashflowMode } from "../../mode/mode.model";
import { ModeService } from "../../mode/mode.service";
import { IncomeSelectors } from "../store/income.selectors";
import { OutcomeSelectors } from "../store/outcome.selectors";

@Component({
    selector: "el-chart-content",
    templateUrl: "./content.component.html",
})
export class ContentComponent implements OnInit, OnDestroy {
    private _sub!: Subscription;

    @Input()
    public mode!: "period" | "section";
    public isIncome!: boolean;
    public isOutcome!: boolean;

    public incomeChartPointsSelector!: MemoizedSelector<
        object,
        IChartPoint[],
        DefaultProjectorFn<IChartPoint[]>
    >;

    public incomeChartSectionsSelector!: MemoizedSelector<
        object,
        IChartSection[],
        DefaultProjectorFn<IChartSection[]>
    >;

    public outcomeChartPointsSelector!: MemoizedSelector<
        object,
        IChartPoint[],
        DefaultProjectorFn<IChartPoint[]>
    >;

    public outcomeChartSectionsSelector!: MemoizedSelector<
        object,
        IChartSection[],
        DefaultProjectorFn<IChartSection[]>
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

        this.incomeChartPointsSelector = this._incomeSelectors.points;
        this.incomeChartSectionsSelector = this._incomeSelectors.sections;
        this.outcomeChartPointsSelector = this._outcomeSelectors.points;
        this.outcomeChartSectionsSelector = this._outcomeSelectors.sections;
    }

    public ngOnDestroy(): void {
        if (this._sub) {
            this._sub.unsubscribe();
        }
    }
}
