import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { isValid, parse } from "date-fns";

import { IImportService } from "../model/import.model";
import { ICategory } from "../../adjustment/model/outcome.model";
import {
    IOutcome,
    IOutcomeData,
    OutcomeData,
} from "../../data/model/outcome.model";
import * as fromActions from "../../data/store/outcome.actions";
import * as _ from "lodash";

@Injectable()
export class ImportOutcomeService implements IImportService<IOutcome> {
    constructor(private _store$: Store) {}

    public processItems(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        data: any[],
        categories: ICategory[],
        outcomes?: IOutcome[],
    ): { total: number; deleted: number } {
        const now = new Date();
        const deleteIds: string[] = [];
        const items = _.map(data, item => {
            const date = parse(item.Date, "dd/MM/yyyy", 0);
            const sum = item.Sum as number;
            const category = item.Category;
            const description = item.Description as string;
            const categoryId = categories
                ? _(categories).find(item => item.name === category)?.id
                : null;
            if (
                isValid(date) &&
                _.isFinite(sum) &&
                categoryId &&
                (!description || _.isString(description))
            ) {
                if (outcomes) {
                    _(outcomes)
                        .filter(
                            (item: IOutcome): boolean =>
                                item.date.getTime() === date.getTime() &&
                                item.category.id === categoryId,
                        )
                        .map((item: IOutcome): string => item.id)
                        .forEach(id => deleteIds.push(id));
                }
                return new OutcomeData(date, sum, categoryId, description, now);
            } else {
                throw new Error();
            }
        });
        this.saveItems(items, deleteIds);
        return { total: items.length, deleted: deleteIds.length };
    }

    private saveItems(items: IOutcomeData[], deleteIds: string[]): void {
        if (deleteIds.length) {
            this._store$.dispatch(
                fromActions.deleteOutcomes({ payload: deleteIds }),
            );
        }
        this._store$.dispatch(
            fromActions.addOutcomes({ payload: items, isInit: false }),
        );
    }
}
