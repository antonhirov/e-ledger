import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { isValid, parse } from "date-fns";

import { IImportService } from "../model/import.model";
import { ISource } from "../../adjustment/model/income.model";
import {
    IIncome,
    IIncomeData,
    IncomeData,
} from "../../data/model/income.model";
import * as fromActions from "../../data/store/income.actions";
import * as _ from "lodash";

@Injectable()
export class ImportIncomeService implements IImportService<IIncome> {
    constructor(private _store$: Store) {}

    public processItems(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        data: any[],
        sources: ISource[],
        incomes?: IIncome[],
    ): { total: number; deleted: number } {
        const now = new Date();
        const deleteIds: string[] = [];
        const items = _.map(data, item => {
            const from = parse(item.From, "dd/MM/yyyy", 0);
            const to = parse(item.To, "dd/MM/yyyy", 0);
            const sum = item.Sum as number;
            const source = item.Source;
            const sourceId = sources
                ? _(sources).find(item => item.name === source)?.id
                : null;
            if (isValid(from) && isValid(to) && _.isFinite(sum) && sourceId) {
                if (incomes) {
                    _(incomes)
                        .filter(
                            (item: IIncome): boolean =>
                                item.from.getTime() === from.getTime() &&
                                item.to.getTime() === to.getTime() &&
                                item.source.id === sourceId,
                        )
                        .map((item: IIncome): string => item.id)
                        .forEach(id => deleteIds.push(id));
                }
                return new IncomeData(from, to, sum, sourceId, now);
            } else {
                throw new Error();
            }
        });
        this.saveItems(items, deleteIds);
        return { total: items.length, deleted: deleteIds.length };
    }

    private saveItems(items: IIncomeData[], deleteIds: string[]): void {
        if (deleteIds.length) {
            this._store$.dispatch(
                fromActions.deleteIncomes({ payload: deleteIds }),
            );
        }
        this._store$.dispatch(
            fromActions.addIncomes({ payload: items, isInit: false }),
        );
    }
}
