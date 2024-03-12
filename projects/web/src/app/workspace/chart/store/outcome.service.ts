import { Injectable } from "@angular/core";
import { eachMonthOfInterval } from "date-fns";
import { IOutcome } from "../../data/model/outcome.model";
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
export class OutcomeService {
    constructor(private _dataService: DataService) {}

    public getPoints(year: number | null, items: IOutcome[]): IChartPoint[] {
        return this._dataService.getChart(
            year,
            items,
            this.getPointsAction.bind(this),
            this.getFilterAction,
        );
    }

    public getSections(
        year: number | null,
        items: IOutcome[],
    ): IChartSection[] {
        return this._dataService.getChart(
            year,
            items,
            this.getSectionsAction.bind(this),
            this.getFilterAction,
        );
    }

    private getFilterAction(item: IOutcome, from: Date, to: Date): boolean {
        return item.date >= from && item.date <= to;
    }

    private getPointsAction(
        items: IOutcome[],
        from: Date,
        to: Date,
    ): IChartPoint[] {
        const monts = eachMonthOfInterval({ start: from, end: to });
        return _.map(this.getMonthSumSet(monts, items), item => {
            return new ChartPoint(item.key.toShortMonthString(), item.value);
        });
    }

    private getSectionsAction(items: IOutcome[]): IChartSection[] {
        const sections = _(this.getCategorySumSet(items))
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

    private getMonthSumSet(months: Date[], items: IOutcome[]): IItem<Date>[] {
        const set: IItem<Date>[] = [];
        for (const month of months) {
            const monthItems = _(items).filter(
                item =>
                    month.getFullYear() === item.date.getFullYear() &&
                    month.getMonth() === item.date.getMonth(),
            );
            set.push(
                new Item(
                    month,
                    monthItems.sumBy(item => item.sum),
                ),
            );
        }
        return set;
    }

    private getCategorySumSet(items: IOutcome[]): IItem<number>[] {
        const set: IItem<number>[] = [];
        for (const item of items) {
            set.push(new Item(item.category.id, item.sum, item.category.name));
        }
        return set;
    }
}
