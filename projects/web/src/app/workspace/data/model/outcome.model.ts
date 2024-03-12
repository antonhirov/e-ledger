import { v4 as uuid } from "uuid";
import { IEntity } from "./state.model";
import { ICategory } from "../../adjustment/model/outcome.model";
import { environment } from "../../../../environments/environment";

interface IOutcomeCommon extends IEntity {
    readonly date: Date;
    readonly sum: number;
    readonly description: string | null;
}

export interface IOutcomeData extends IOutcomeCommon {
    readonly categoryId: number;
}

export interface IOutcome extends IOutcomeCommon {
    readonly category: ICategory;
}

export class OutcomeData implements IOutcomeData {
    public readonly id: string;
    public readonly created: Date;

    public readonly date: Date;
    public readonly sum: number;
    public readonly categoryId: number;
    public readonly description: string | null;

    constructor(
        date: Date,
        sum: number,
        categoryId: number,
        description: string | null,
        created?: Date,
        id?: string,
    ) {
        this.date = date;
        this.categoryId = categoryId;
        this.created = created || new Date();

        if (id) {
            this.id = id;
            this.sum = sum;
            this.description = description;
        } else {
            this.id = uuid();
            const sumValue = sum.round2();
            this.sum = sumValue <= environment.sumMaxValue ? sumValue : 0;

            this.description = description
                ? description.substring(0, environment.descriptionMaxLength)
                : null;
        }
    }
}

export class Outcome implements IOutcome {
    constructor(
        public readonly id: string,
        public readonly created: Date,
        public readonly date: Date,
        public readonly sum: number,
        public readonly description: string | null,
        public readonly category: ICategory,
    ) {}
}
