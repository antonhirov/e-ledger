import { createAction } from "@ngrx/store";

const UNDEFINED_ACTION = "[None] Undefined action";
export const undefinedAction = createAction(UNDEFINED_ACTION);
