import { ActionReducer, createReducer, on } from "@ngrx/store";

import { IAuthState } from "../model/state.model";
import * as fromActions from "./auth.actions";

export class AuthReducer {
    public createReducer(): ActionReducer<IAuthState> {
        const initialState: IAuthState = { user: null, error: null };

        return createReducer(
            initialState,
            on(
                fromActions.signupStart,
                fromActions.loginStart,
                (state): IAuthState => ({
                    ...state,
                    error: null,
                }),
            ),
            on(
                fromActions.loginEnd,
                (state, { payload }): IAuthState => ({
                    ...state,
                    user: payload.user.copy(),
                    error: null,
                }),
            ),
            on(
                fromActions.loginFail,
                (state, { payload }): IAuthState => ({
                    ...state,
                    user: null,
                    error: payload,
                }),
            ),
            on(
                fromActions.clear,
                (): IAuthState => ({ user: null, error: null }),
            ),
        );
    }
}
