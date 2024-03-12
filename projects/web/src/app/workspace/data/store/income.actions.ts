import { createAction, props } from "@ngrx/store";
import { IIncomeData } from "../model/income.model";

const ADD_INCOME     = "[Data][Income] Add income";
const ADD_INCOMES    = "[Data][Income] Add incomes";
const SET_INCOMES    = "[Data][Income] Set incomes";
const DELETE_INCOME  = "[Data][Income] Delete income";
const DELETE_INCOMES = "[Data][Income] Delete incomes";
const PROCESS_YEARS  = "[Data][Income] Process years";
const SET_YEARS      = "[Data][Income] Set years";
const CLEAR          = "[Data][Income] Clear";

export const addIncome = createAction(
    ADD_INCOME,
    props<{ payload: IIncomeData }>(),
);
export const addIncomes = createAction(
    ADD_INCOMES,
    props<{ payload: IIncomeData[]; isInit: boolean }>(),
);
export const setIncomes = createAction(
    SET_INCOMES,
    props<{ payload: IIncomeData[]; isInit: boolean }>(),
);
export const deleteIncome = createAction(
    DELETE_INCOME,
    props<{ payload: string }>(),
);
export const deleteIncomes = createAction(
    DELETE_INCOMES,
    props<{ payload: string[] }>(),
);
export const processYears = createAction(
    PROCESS_YEARS,
    props<{ payload: IIncomeData[] }>(),
);
export const setYears = createAction(SET_YEARS, props<{ payload: number[] }>());
export const clear = createAction(CLEAR);
