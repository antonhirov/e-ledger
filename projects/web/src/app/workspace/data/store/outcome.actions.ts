import { createAction, props } from "@ngrx/store";
import { IOutcomeData } from "../model/outcome.model";

const ADD_OUTCOME     = "[Data][Outcome] Add outcome";
const ADD_OUTCOMES    = "[Data][Outcome] Add outcomes";
const SET_OUTCOMES    = "[Data][Outcome] Set outcomes";
const DELETE_OUTCOME  = "[Data][Outcome] Delete outcome";
const DELETE_OUTCOMES = "[Data][Outcome] Delete outcomes";
const PROCESS_YEARS   = "[Data][Outcome] Process years";
const SET_YEARS       = "[Data][Outcome] Set years";
const CLEAR           = "[Data][Outcome] Clear";

export const addOutcome = createAction(
    ADD_OUTCOME,
    props<{ payload: IOutcomeData }>(),
);
export const addOutcomes = createAction(
    ADD_OUTCOMES,
    props<{ payload: IOutcomeData[]; isInit: boolean }>(),
);
export const setOutcomes = createAction(
    SET_OUTCOMES,
    props<{ payload: IOutcomeData[]; isInit: boolean }>(),
);
export const deleteOutcome = createAction(
    DELETE_OUTCOME,
    props<{ payload: string }>(),
);
export const deleteOutcomes = createAction(
    DELETE_OUTCOMES,
    props<{ payload: string[] }>(),
);
export const processYears = createAction(
    PROCESS_YEARS,
    props<{ payload: IOutcomeData[] }>(),
);
export const setYears = createAction(SET_YEARS, props<{ payload: number[] }>());
export const clear = createAction(CLEAR);
