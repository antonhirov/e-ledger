import { createAction, props } from "@ngrx/store";
import { ISource } from "../model/income.model";
import { ICategory } from "../model/outcome.model";

const SET_ENUMS     = "[Adjustment][Enumeration] Set enums";
const REFRESH_ENUMS = "[Adjustment][Enumeration] Refresh enums";
const CLEAR         = "[Adjustment][Enumeration] Clear";

export const setEnums = createAction(
    SET_ENUMS,
    props<{ payload: { sources: ISource[]; categories: ICategory[] } }>(),
);
export const refreshEnums = createAction(REFRESH_ENUMS);
export const clear = createAction(CLEAR);
