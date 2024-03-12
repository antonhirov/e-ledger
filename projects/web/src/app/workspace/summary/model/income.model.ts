import { IIncome, IIncomeData } from "../../data/model/income.model";
import { IEntityFilter } from "../../data/model/state.model";

export interface IIncomeFilter extends IEntityFilter {
    readonly from: Date | null;
    readonly to: Date | null;
    readonly sourceId: number | null;
}

export class IncomeFilter implements IIncomeFilter {
    constructor(
        public readonly from: Date | null = null,
        public readonly to: Date | null = null,
        public readonly sourceId: number | null = null,
    ) {}

    public any(): boolean {
        return this.from || this.to || this.sourceId ? true : false;
    }

    public process(item: IIncome | IIncomeData): boolean {
        const isFrom = this.from === null || this.from <= item.to;
        const isTo = this.to === null || this.to >= item.from;
        const isSource =
            this.sourceId === null || this.sourceId === this.getId(item);

        return isFrom && isTo && isSource;
    }

    private getId(item: IIncome | IIncomeData): number | null {
        if ("source" in item) {
            return item.source.id;
        }
        if ("sourceId" in item) {
            return item.sourceId;
        }
        return null;
    }
}
