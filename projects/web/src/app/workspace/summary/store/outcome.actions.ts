import { createAction, props } from "@ngrx/store";
import { IOutcomeData } from "../../data/model/outcome.model";
import { IOutcomeFilter } from "../model/outcome.model";

const ADD_OUTCOME    = "[Summary][Outcome] Add outcome";
const DELETE_OUTCOME = "[Summary][Outcome] Delete outcome";
const SET_FILTER     = "[Summary][Outcome] Set filter";
const SELECT_PAGE    = "[Summary][Outcome] Select page";
const PROCESS_PAGE   = "[Summary][Outcome] Process page";
const SET_PAGE       = "[Summary][Outcome] Set page";
const SET_OUTPUT     = "[Summary][Outcome] Set output";
const PROCESS_OUTPUT = "[Summary][Outcome] Process output";
const CLEAR          = "[Summary][Outcome] Clear";

export const addOutcome = createAction(
    ADD_OUTCOME,
    props<{ payload: IOutcomeData }>(),
);
export const deleteOutcome = createAction(
    DELETE_OUTCOME,
    props<{ payload: string }>(),
);
export const setFilter = createAction(
    SET_FILTER,
    props<{ payload: IOutcomeFilter }>(),
);
export const selectPage = createAction(
    SELECT_PAGE,
    props<{ payload: number }>(),
);
export const processPage = createAction(PROCESS_PAGE);
export const setPage = createAction(
    SET_PAGE,
    props<{ payload: number }>(),
);
export const setOutput = createAction(
    SET_OUTPUT,
    props<{ payload: string[] }>(),
);
export const processOutput = createAction(PROCESS_OUTPUT);
export const clear = createAction(CLEAR);
