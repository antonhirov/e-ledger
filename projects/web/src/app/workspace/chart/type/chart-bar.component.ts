import {
    AfterViewInit,
    Component,
    Input,
    OnDestroy,
    OnInit,
    ViewChild,
} from "@angular/core";
import { DefaultProjectorFn, MemoizedSelector, Store } from "@ngrx/store";

import { ChartConfiguration, ChartType, Plugin } from "chart.js";
import { BaseChartDirective } from "ng2-charts";
import { Subscription } from "rxjs";

import { IChartPoint } from "../model/chart.model";
import { ScssVariables } from "../model/scss.model";
import { ChartService } from "../chart.service";
import DatalabelsPlugin from "chartjs-plugin-datalabels";

@Component({
    selector: "el-chart-bar",
    templateUrl: "./chart-bar.component.html",
})
export class ChartBarComponent implements OnInit, OnDestroy, AfterViewInit {
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
    public plugins!: Plugin[];

    constructor(private _chartService: ChartService, private _store$: Store) {}

    public ngOnInit(): void {
        this._styles = this._chartService.styles;
        this.type = this.getType();
        this.data = this.getData();
        this.options = this.getOptions();
        this.plugins = this.getPlugins();
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
        return "bar";
    }

    public getOptions(): ChartConfiguration["options"] {
        const scale = {
            grid: { color: this._styles.success },
            ticks: { color: this._styles.dark },
        };
        return {
            plugins: {
                legend: { display: false },
                datalabels: {
                    anchor: "end",
                    align: "end",
                    color: this._styles.dark,
                    formatter: (value): string | null => {
                        return value && value.y > 0 ? `${value.y}$` : null;
                    },
                },
                tooltip: { enabled: false },
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
                    borderWidth: 3,
                    borderColor: dark,
                    backgroundColor: this._styles.primary,
                    hoverBorderColor: dark,
                    hoverBackgroundColor: this._styles.success,
                    parsing: { xAxisKey: "x", yAxisKey: "y" },
                },
            ],
        };
    }

    public getPlugins(): Plugin[] {
        return [DatalabelsPlugin];
    }
}
