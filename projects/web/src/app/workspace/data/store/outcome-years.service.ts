import { Injectable } from "@angular/core";
import { IOutcome, IOutcomeData } from "../model/outcome.model";
import * as _ from "lodash";

@Injectable()
export class OutcomeYearsService {
    public getYears(
        newItems: IOutcomeData[],
        allItems: IOutcome[],
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

    private processItem(item: IOutcome | IOutcomeData, years: number[]): void {
        years.push(item.date.getFullYear());
    }
}
