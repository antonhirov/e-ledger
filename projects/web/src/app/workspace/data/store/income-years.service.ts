import { Injectable } from "@angular/core";
import { eachYearOfInterval } from "date-fns";
import { IIncome, IIncomeData } from "../model/income.model";
import * as _ from "lodash";

@Injectable()
export class IncomeYearsService {
    public getYears(
        newItems: IIncomeData[],
        allItems: IIncome[],
        allYears: number[],
    ): number[] {
        const years: number[] = [];
        if (newItems.length) {
            _(newItems).forEach(item => this.processItem(item, years));
            years.push(...allYears);
        } else {
            _(allItems).forEach(item => {
                if (item) {
                    this.processItem(item, years);
                }
            });
        }
        return _(years)
            .uniq()
            .orderBy(item => item, "desc")
            .value();
    }

    private processItem(item: IIncome | IIncomeData, years: number[]): void {
        years.push(
            ...eachYearOfInterval({
                start: item.from,
                end: item.to,
            }).map(item => item.getFullYear()),
        );
    }
}
