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

import { IChartSection } from "../model/chart.model";
import { ScssVariables } from "../model/scss.model";
import { ChartService } from "../chart.service";
import DatalabelsPlugin from "chartjs-plugin-datalabels";
import * as _ from "lodash";

@Component({
    selector: "el-chart-pie",
    templateUrl: "./chart-pie.component.html",
})
export class ChartPieComponent implements OnInit, OnDestroy, AfterViewInit {
    private _sub!: Subscription;
    private _styles!: { [key in ScssVariables]: string };

    @ViewChild(BaseChartDirective)
    private _chart!: BaseChartDirective;
    @Input()
    public selector!: MemoizedSelector<
        object,
        IChartSection[],
        DefaultProjectorFn<IChartSection[]>
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
            const chartData = this._chart?.data;
            if (chartData && chartData.datasets && chartData.datasets.length) {
                chartData.datasets[0].data = data.length
                    ? _.map(data, item => item.value)
                    : [0];
                chartData.labels = data.length
                    ? _.map(data, item => item.name)
                    : ["No data..."];
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
        return "pie";
    }

    public getOptions(): ChartConfiguration["options"] {
        return {
            maintainAspectRatio: false,
            plugins: {
                legend: { display: false },
                datalabels: {
                    color: this._styles.dark,
                    formatter: (_value, ctx): string | null => {
                        return ctx.chart.data.labels
                            ? (ctx.chart.data.labels[ctx.dataIndex] as string)
                            : null;
                    },
                },
                tooltip: {
                    callbacks: {
                        label: ctx => `${ctx.label}: ${ctx.formattedValue}$`,
                    },
                },
            },
            layout: { padding: { top: 14, bottom: 14 } },
        };
    }

    public getData(): ChartConfiguration["data"] {
        const dark = this._styles.dark;
        return {
            datasets: [
                {
                    data: [],
                    borderColor: dark,
                    backgroundColor: this._styles.primary,
                    hoverBorderWidth: 5,
                    hoverBorderColor: dark,
                    hoverBackgroundColor: this._styles.success,
                },
            ],
        };
    }

    public getPlugins(): Plugin[] {
        return [DatalabelsPlugin];
    }
}
