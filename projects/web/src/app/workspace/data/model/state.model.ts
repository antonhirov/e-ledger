import { EntityState } from "@ngrx/entity";
import { IIncomeData } from "./income.model";
import { IOutcomeData } from "./outcome.model";

interface IState<T> extends EntityState<T> {
    readonly years: number[];
}

export interface ICommonState {
    readonly isUnsaved: boolean;
    readonly error: string | null;
}

/* eslint-disable  @typescript-eslint/no-empty-interface */
export interface IIncomeState extends IState<IIncomeData> {}
export interface IOutcomeState extends IState<IOutcomeData> {}
/* eslint-enable  @typescript-eslint/no-empty-interface */

export interface IDataState {
    readonly common: ICommonState;
    readonly income: IIncomeState;
    readonly outcome: IOutcomeState;
}

export interface IEntity {
    readonly id: string;
    readonly created: Date;
}

export interface IEntityFilter {
    any(): boolean;
    process(item: IEntity): boolean;
}
