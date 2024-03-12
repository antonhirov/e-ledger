import { Injectable } from "@angular/core";
import { startOfYear, endOfYear } from "date-fns";
import * as _ from "lodash";

@Injectable()
export class DataService {
    public getChart<T, R>(
        year: number | null,
        items: T[],
        action: (items: T[], from?: Date, to?: Date) => R[],
        filterAction: (item: T, from: Date, to: Date) => boolean,
    ): R[] {
        if (year) {
            const filter = this.getFilter<T>(year, items, filterAction);
            if (filter.items.length) {
                return action(filter.items, filter.from, filter.to);
            }
        }
        return [];
    }

    private getFilter<T>(
        year: number,
        items: T[],
        filterAction: (item: T, from: Date, to: Date) => boolean,
    ): { items: T[]; from: Date; to: Date } {
        const from = startOfYear(new Date(year, 0));
        const to = endOfYear(new Date(year, 11));

        return {
            items: <T[]>_.filter(items, (item: T): boolean => {
                return filterAction(item, from, to);
            }),
            from,
            to,
        };
    }
}
