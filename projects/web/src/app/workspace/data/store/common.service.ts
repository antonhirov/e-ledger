import { Injectable } from "@angular/core";
import { IIncomeData, IncomeData } from "../model/income.model";
import { IOutcomeData, OutcomeData } from "../model/outcome.model";
import {
    IEntitiesResponse,
    IEnumerationsResponse,
    IIncomeResponse,
    IOutcomeResponse,
} from "../model/response.model";
import { ISource, Source } from "../../adjustment/model/income.model";
import { Category, ICategory } from "../../adjustment/model/outcome.model";
import * as _ from "lodash";

@Injectable()
export class CommonService {
    public parseEnumerations(enumerations: IEnumerationsResponse): {
        sources: ISource[];
        categories: ICategory[];
    } {
        return {
            sources: _.map(
                enumerations.sources,
                item => new Source(item.id, item.name),
            ),
            categories: _.map(
                enumerations.categories,
                item => new Category(item.id, item.name),
            ),
        };
    }

    public parseEntities(entities: IEntitiesResponse): {
        incomes: IIncomeData[];
        outcomes: IOutcomeData[];
    } {
        return {
            incomes: _.map(entities.incomes, item => this.parseIncome(item)),
            outcomes: _.map(entities.outcomes, item => this.parseOutcome(item)),
        };
    }

    private parseIncome(income: IIncomeResponse): IIncomeData {
        return new IncomeData(
            new Date(income.from),
            new Date(income.to),
            income.sum,
            income.sourceId,
            new Date(income.created),
            income.sumPerDay,
            income.id,
        );
    }

    private parseOutcome(outcome: IOutcomeResponse): IOutcomeData {
        return new OutcomeData(
            new Date(outcome.date),
            outcome.sum,
            outcome.categoryId,
            outcome.description || null,
            new Date(outcome.created),
            outcome.id,
        );
    }
}
