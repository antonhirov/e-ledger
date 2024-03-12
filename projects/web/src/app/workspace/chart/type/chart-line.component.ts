import {
    AfterViewInit,
    Component,
    Input,
    OnDestroy,
    OnInit,
    ViewChild,
} from "@angular/core";
import { DefaultProjectorFn, MemoizedSelector, Store } from "@ngrx/store";

import { ChartConfiguration, ChartType } from "chart.js";
import { BaseChartDirective } from "ng2-charts";
import { Subscription } from "rxjs";

import { IChartPoint } from "../model/chart.model";
import { ScssVariables } from "../model/scss.model";
import { ChartService } from "../chart.service";

@Component({
    selector: "el-chart-line",
    templateUrl: "./chart-line.component.html",
})
export class ChartLineComponent implements OnInit, OnDestroy, AfterViewInit {
    private _sub!: Subscription;
    private _styles!: { [key in ScssVariables]: string };

    @ViewChild(BaseChartDirective)
    private _chart!: BaseChartDirective;
    @Input()
    public selector!: MemoizedSelector<
        object,
        IChartPoint[],
        DefaultProjectorFn<IChartPoint[]>
    >;

    public type!: ChartType;
    public data!: ChartConfiguration["data"];
    public options!: ChartConfiguration["options"];

    constructor(private _chartService: ChartService, private _store$: Store) {}

    public ngOnInit(): void {
        this._styles = this._chartService.styles;
        this.type = this.getType();
        this.data = this.getData();
        this.options = this.getOptions();
    }

    public ngAfterViewInit(): void {
        this._sub = this._store$.select(this.selector).subscribe(data => {
            const datasets = this._chart?.data?.datasets;
            if (datasets && datasets.length) {
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                datasets[0].data = data as any;
                this._chart.update();
            }
        });
    }

    public ngOnDestroy(): void {
        if (this._sub) {
            this._sub.unsubscribe();
        }
    }

    public getType(): ChartType {
        return "line";
    }

    public getOptions(): ChartConfiguration["options"] {
        const scale = {
            grid: { color: this._styles.success },
            ticks: { color: this._styles.dark },
        };
        return {
            elements: { line: { tension: 0.5 } },
            plugins: {
                legend: { display: false },
                tooltip: {
                    callbacks: { label: ctx => `${ctx.formattedValue}$` },
                },
            },
            layout: { padding: { top: 14 } },
            scales: { x: scale, y: scale },
            maintainAspectRatio: false,
        };
    }

    public getData(): ChartConfiguration["data"] {
        const dark = this._styles.dark;
        return {
            datasets: [
                {
                    data: [],
                    fill: "origin",
                    borderColor: dark,
                    pointStyle: "triangle",
                    pointBackgroundColor: this._styles.success,
                    pointBorderColor: dark,
                    pointHoverBackgroundColor: this._styles.light,
                    pointHoverBorderColor: dark,
                    backgroundColor: this._styles.primary,
                    parsing: { xAxisKey: "x", yAxisKey: "y" },
                },
            ],
        };
    }
}
