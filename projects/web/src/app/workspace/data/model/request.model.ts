import { Dictionary } from "@ngrx/entity";
import { IIncomeData } from "./income.model";
import { IOutcomeData } from "./outcome.model";
import { ISource } from "../../adjustment/model/income.model";
import { ICategory } from "../../adjustment/model/outcome.model";
import * as _ from "lodash";

interface IEntitiesRequest {
    incomes: IIncomeData[];
    outcomes: IOutcomeData[];
}

interface IEnumerationsRequest {
    sources: ISource[];
    categories: ICategory[];
}

interface IDataRequest {
    entities: IEntitiesRequest;
    enumerations: IEnumerationsRequest;
}

export class DataRequest implements IDataRequest {
    public entities: IEntitiesRequest;
    public enumerations: IEnumerationsRequest;

    constructor(
        entities: {
            incomes: Dictionary<IIncomeData>;
            outcomes: Dictionary<IOutcomeData>;
        },
        enumerations: {
            sources: ISource[];
            categories: ICategory[];
        },
    ) {
        this.entities = {
            incomes: <IIncomeData[]>_.values(entities.incomes),
            outcomes: <IOutcomeData[]>_.values(entities.outcomes),
        };
        this.enumerations = {
            sources: [...enumerations.sources],
            categories: [...enumerations.categories],
        };
    }
}
