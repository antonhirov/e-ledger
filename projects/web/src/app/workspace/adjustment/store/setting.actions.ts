import { createAction, props } from "@ngrx/store";

import { DialogMode } from "../model/dialog-mode.model";
import { SyncPeriod } from "../model/sync-period.model";
import { IAuthRequest } from "../../../auth/model/request.model";
import { ISetting } from "../model/setting.model";

const SAVE          = "[Adjustment][Setting] Save";
const LOAD_WORKFLOW = "[Adjustment][Setting] Load workflow";
const SET_WORKFLOW  = "[Adjustment][Setting] Set workflow";
const LOGIN_USER    = "[Adjustment][Setting] Login user";
const ADD_MODE      = "[Adjustment][Setting] Add mode";
const SET_MODE      = "[Adjustment][Setting] Set mode";
const SET_ERROR     = "[Adjustment][Setting] Set error";
const CLEAR_ERROR   = "[Adjustment][Setting] Clear error";
const CLEAR         = "[Adjustment][Setting] Clear";

export const save = createAction(SAVE, props<{ payload: ISetting }>());
export const loadWorkflow = createAction(LOAD_WORKFLOW);
export const setWorkflow = createAction(
    SET_WORKFLOW,
    props<{ payload: SyncPeriod }>(),
);
export const loginUser = createAction(
    LOGIN_USER,
    props<{
        payload: { request: IAuthRequest; setting: ISetting };
    }>(),
);
export const addMode = createAction(ADD_MODE, props<{ payload: DialogMode }>());
export const setMode = createAction(SET_MODE, props<{ payload: DialogMode }>());
export const setError = createAction(SET_ERROR, props<{ payload: string }>());
export const clearError = createAction(CLEAR_ERROR);
export const clear = createAction(CLEAR);
