import { IIncomeFilter } from "./income.model";
import { IOutcomeFilter } from "./outcome.model";

interface IState<F> {
    readonly filter: F;
    readonly page: number;
    readonly ids: string[];
}

/* eslint-disable  @typescript-eslint/no-empty-interface */
export interface IIncomeState extends IState<IIncomeFilter> {}
export interface IOutcomeState extends IState<IOutcomeFilter> {}
/* eslint-enable  @typescript-eslint/no-empty-interface */

export interface ISummaryState {
    readonly income: IIncomeState;
    readonly outcome: IOutcomeState;
}
