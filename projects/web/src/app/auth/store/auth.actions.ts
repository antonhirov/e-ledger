import { createAction, props } from "@ngrx/store";

import { IAuthUser } from "../model/user.model";
import { IAuthRequest } from "../model/request.model";

const SIGNUP_START = "[Auth] Signup start";
const LOGIN_START  = "[Auth] Login start";
const LOGIN_END    = "[Auth] Login end";
const LOGIN_FAIL   = "[Auth] Login fail";
const LOGIN_AUTO   = "[Auth] Login auto";
const CLEAR        = "[Auth] Clear";

export const signupStart = createAction(
    SIGNUP_START,
    props<{ payload: IAuthRequest }>(),
);
export const loginStart = createAction(
    LOGIN_START,
    props<{ payload: IAuthRequest }>(),
);
export const loginEnd = createAction(
    LOGIN_END,
    props<{
        payload: {
            user: IAuthUser;
            isRedirected: boolean;
        };
    }>(),
);
export const loginFail = createAction(LOGIN_FAIL, props<{ payload: string }>());
export const loginAuto = createAction(LOGIN_AUTO);
export const clear = createAction(CLEAR);
