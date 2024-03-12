import { InjectionToken, NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { ActionReducer, StoreModule } from "@ngrx/store";
import { EffectsModule } from "@ngrx/effects";

import { ControlSharedModule } from "../shared/control/control-shared.module";
import { AuthComponent } from "./auth.component";

import { Feature } from "../shared/store/app.model";
import { AuthEffects } from "./store/auth.effects";

import { AuthLoginService } from "./auth-login.service";
import { AuthErrorService } from "./auth-error.service";
import { AuthTimerService } from "./auth-timer.service";
import { AuthResponseService } from "./auth-response.service";
import { AuthSelectors } from "./store/auth.selectors";

import { IAuthState } from "./model/state.model";
import { AuthReducer } from "./store/auth.reducer";

const AUTH_REDUCER = new InjectionToken<ActionReducer<IAuthState>>(
    "Auth reducer",
);

@NgModule({
    declarations: [AuthComponent],
    imports: [
        CommonModule,
        FormsModule,
        ControlSharedModule,
        RouterModule.forChild([{ path: "auth", component: AuthComponent }]),
        StoreModule.forFeature(Feature.Auth, AUTH_REDUCER),
        EffectsModule.forFeature([AuthEffects]),
    ],
    providers: [
        AuthResponseService,
        AuthErrorService,
        AuthTimerService,
        AuthLoginService,
        AuthSelectors,
        AuthReducer,
        {
            provide: AUTH_REDUCER,
            deps: [AuthReducer],
            useFactory: (reducer: AuthReducer): ActionReducer<IAuthState> =>
                reducer.createReducer(),
        },
    ],
})
export class AuthModule {}
