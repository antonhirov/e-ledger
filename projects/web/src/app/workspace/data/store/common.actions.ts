import { createAction, props } from "@ngrx/store";
import { IIncomeData } from "../model/income.model";
import { IOutcomeData } from "../model/outcome.model";
import { SyncPeriod } from "../../adjustment/model/sync-period.model";

const SAVE_DATA    = "[Data][Common] Save data";
const LOAD_DATA    = "[Data][Common] Load data";
const SYNC_DATA    = "[Data][Common] Sync data";
const SET_SYNC     = "[Data][Common] Set sync";
const SET_ENTITIES = "[Data][Common] Set entities";
const SET_SAVED    = "[Data][Common] Set saved";
const SET_UNSAVED  = "[Data][Common] Set unsaved";
const SET_STATUS   = "[Data][Common] Set status";
const SET_ERROR    = "[Data][Common] Set error";
const CLEAR        = "[Data][Common] Clear";

export const saveData = createAction(SAVE_DATA);
export const loadData = createAction(LOAD_DATA);
export const syncData = createAction(SYNC_DATA);
export const setSync = createAction(SET_SYNC, props<{ payload: SyncPeriod }>());
export const setEntities = createAction(
    SET_ENTITIES,
    props<{ payload: { incomes: IIncomeData[]; outcomes: IOutcomeData[] } }>(),
);
export const setSaved = createAction(SET_SAVED);
export const setUnsaved = createAction(SET_UNSAVED);
export const setStatus = createAction(
    SET_STATUS,
    props<{ payload: boolean }>(),
);
export const setError = createAction(
    SET_ERROR,
    props<{ payload: string | null }>(),
);
export const clear = createAction(CLEAR);
