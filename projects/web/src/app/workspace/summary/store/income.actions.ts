import { createAction, props } from "@ngrx/store";
import { IIncomeData } from "../../data/model/income.model";
import { IIncomeFilter } from "../model/income.model";

const ADD_INCOME     = "[Summary][Income] Add income";
const DELETE_INCOME  = "[Summary][Income] Delete income";
const SET_FILTER     = "[Summary][Income] Set filter";
const SELECT_PAGE    = "[Summary][Income] Select page";
const PROCESS_PAGE   = "[Summary][Income] Process page";
const SET_PAGE       = "[Summary][Income] Set page";
const SET_OUTPUT     = "[Summary][Income] Set output";
const PROCESS_OUTPUT = "[Summary][Income] Process output";
const CLEAR          = "[Summary][Income] Clear";

export const addIncome = createAction(
    ADD_INCOME,
    props<{ payload: IIncomeData }>(),
);
export const deleteIncome = createAction(
    DELETE_INCOME,
    props<{ payload: string }>(),
);
export const setFilter = createAction(
    SET_FILTER,
    props<{ payload: IIncomeFilter }>(),
);
export const selectPage = createAction(
    SELECT_PAGE,
    props<{ payload: number }>(),
);
export const processPage = createAction(PROCESS_PAGE);
export const setPage = createAction(
    SET_PAGE,
    props<{ payload: number }>()
);
export const setOutput = createAction(
    SET_OUTPUT,
    props<{ payload: string[] }>(),
);
export const processOutput = createAction(PROCESS_OUTPUT);
export const clear = createAction(CLEAR);
