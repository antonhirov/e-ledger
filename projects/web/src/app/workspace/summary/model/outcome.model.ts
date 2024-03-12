import { IOutcome, IOutcomeData } from "../../data/model/outcome.model";
import { IEntityFilter } from "../../data/model/state.model";

export interface IOutcomeFilter extends IEntityFilter {
    readonly from: Date | null;
    readonly to: Date | null;
    readonly categoryId: number | null;
}

export class OutcomeFilter implements IOutcomeFilter {
    constructor(
        public readonly from: Date | null = null,
        public readonly to: Date | null = null,
        public readonly categoryId: number | null = null,
    ) {}

    public any(): boolean {
        return this.from || this.to || this.categoryId ? true : false;
    }

    public process(item: IOutcome | IOutcomeData): boolean {
        const isFrom = this.from === null || this.from <= item.date;
        const isTo = this.to === null || this.to >= item.date;
        const isCategory =
            this.categoryId === null || this.categoryId === this.getId(item);

        return isFrom && isTo && isCategory;
    }

    private getId(item: IOutcome | IOutcomeData): number | null {
        if ("category" in item) {
            return item.category.id;
        }
        if ("categoryId" in item) {
            return item.categoryId;
        }
        return null;
    }
}
