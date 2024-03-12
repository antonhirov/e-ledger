import { Injectable } from "@angular/core";
import { Dictionary } from "@ngrx/entity";

import { ICategory } from "../../adjustment/model/outcome.model";
import { IOutcome, IOutcomeData, Outcome } from "../model/outcome.model";
import * as _ from "lodash";

@Injectable()
export class OutcomeService {
    public getOutcomes(
        ids: string[],
        categories: ICategory[],
        outcomes: Dictionary<IOutcomeData>,
    ): IOutcome[] {
        const items: IOutcome[] = [];
        for (const id of ids) {
            const outcome = outcomes[id];
            if (outcome) {
                const category = _.find(
                    categories,
                    currentCategory =>
                        currentCategory.id === outcome.categoryId,
                );
                if (category) {
                    items.push(
                        new Outcome(
                            outcome.id,
                            outcome.created,
                            outcome.date,
                            outcome.sum,
                            outcome.description,
                            { ...category },
                        ),
                    );
                }
            }
        }
        return items;
    }
}
