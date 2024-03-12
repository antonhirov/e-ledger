import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { TypedAction } from "@ngrx/store/src/models";

import { AuthUser } from "./model/user.model";
import { AuthTimerService } from "./auth-timer.service";
import { AppStorage } from "../shared/store/app.storage";
import { Vault } from "../shared/store/app.model";
import { undefinedAction } from "../shared/store/undefined.action";
import * as fromActions from "./store/auth.actions";

@Injectable()
export class AuthLoginService {
    constructor(
        private _router: Router,
        private _storage: AppStorage,
        private _timer: AuthTimerService,
    ) {}

    public login(isRedirected: boolean): void {
        if (isRedirected) {
            this._router.navigate(["/"]);
        }
    }

    public autoLogin(): TypedAction<string> {
        const userData = this._storage.loadData(Vault.User);
        if (userData) {
            const user = new AuthUser(
                userData.email,
                userData.localId,
                userData._idToken,
                new Date(userData._expiresIn),
            );
            if (user.idToken) {
                this._timer.setTimer(user.expiresIn);
                return fromActions.loginEnd({
                    payload: {
                        user: user,
                        isRedirected: false,
                    },
                });
            }
        }
        return undefinedAction();
    }

    public clear(): void {
        this._storage.clearData(Vault.User);
        this._timer.clearTimer();
        this._router.navigate(["/auth"]);
    }
}
