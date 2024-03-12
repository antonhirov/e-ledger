import { Injectable } from "@angular/core";
import { Dictionary } from "@ngrx/entity";

import { ISource } from "../../adjustment/model/income.model";
import { IIncome, IIncomeData, Income } from "../model/income.model";
import * as _ from "lodash";

@Injectable()
export class IncomeService {
    public getIncomes(
        ids: string[],
        sources: ISource[],
        incomes: Dictionary<IIncomeData>,
    ): IIncome[] {
        const items: IIncome[] = [];
        for (const id of ids) {
            const income = incomes[id];
            if (income) {
                const source = _.find(
                    sources,
                    currentSource => currentSource.id === income.sourceId,
                );
                if (source) {
                    items.push(
                        new Income(
                            income.id,
                            income.created,
                            income.from,
                            income.to,
                            income.sum,
                            income.sumPerDay,
                            { ...source },
                        ),
                    );
                }
            }
        }
        return items;
    }
}
