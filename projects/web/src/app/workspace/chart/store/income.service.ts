import { Injectable } from "@angular/core";
import { getOverlappingDaysInIntervals, eachDayOfInterval } from "date-fns";
import { IIncome } from "../../data/model/income.model";
import { DataService } from "./data.service";
import {
    ChartPoint,
    ChartSection,
    IChartPoint,
    IChartSection,
    IItem,
    Item,
} from "../model/chart.model";
import * as _ from "lodash";

@Injectable()
export class IncomeService {
    constructor(private _dataService: DataService) {}

    public getPoints(year: number | null, items: IIncome[]): IChartPoint[] {
        return this._dataService.getChart(
            year,
            items,
            this.getPointsAction.bind(this),
            this.getFilterAction,
        );
    }

    public getSections(year: number | null, items: IIncome[]): IChartSection[] {
        return this._dataService.getChart(
            year,
            items,
            this.getSectionsAction.bind(this),
            this.getFilterAction,
        );
    }

    private getFilterAction(item: IIncome, from: Date, to: Date): boolean {
        return from <= item.to && to >= item.from;
    }

    private getPointsAction(
        items: IIncome[],
        from: Date,
        to: Date,
    ): IChartPoint[] {
        const days = eachDayOfInterval({ start: from, end: to });
        return _.map(this.getDaySumSet(days, items), item => {
            return new ChartPoint(item.key.toDayShortMonthString(), item.value);
        });
    }

    private getSectionsAction(
        items: IIncome[],
        from: Date,
        to: Date,
    ): IChartSection[] {
        const sections = _(this.getSourceSumSet(from, to, items))
            .groupBy(item => item.key)
            .map((items, key) => {
                return new Item(
                    key,
                    _.sumBy(items, item => item.value),
                    _.first(items)?.name,
                );
            });
        const total = sections.sumBy(item => item.value);
        return sections
            .map(item => {
                return new ChartSection(
                    item.name || "-",
                    (item.value / total) * 100,
                    item.value,
                );
            })
            .value();
    }

    private getDaySumSet(days: Date[], items: IIncome[]): IItem<Date>[] {
        const set: IItem<Date>[] = [];
        for (const day of days) {
            const dayItems = _(items).filter(
                item => day >= item.from && day <= item.to,
            );
            set.push(
                new Item(
                    day,
                    dayItems.sumBy(item => item.sumPerDay),
                ),
            );
        }
        return set;
    }

    private getSourceSumSet(
        from: Date,
        to: Date,
        items: IIncome[],
    ): IItem<number>[] {
        const set: IItem<number>[] = [];
        for (const item of items) {
            const days =
                getOverlappingDaysInIntervals(
                    { start: from, end: to },
                    { start: item.from, end: item.to },
                ) + 1;
            set.push(
                new Item(
                    item.source.id,
                    days * item.sumPerDay,
                    item.source.name,
                ),
            );
        }
        return set;
    }
}
