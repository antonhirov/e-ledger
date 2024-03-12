import { Injectable } from "@angular/core";
import { HttpErrorResponse } from "@angular/common/http";

import { AuthUser, IAuthUser } from "./model/user.model";
import { IAuthResponse } from "./model/response.model";
import { AuthTimerService } from "./auth-timer.service";
import { AppStorage } from "../shared/store/app.storage";
import { Vault } from "../shared/store/app.model";

@Injectable()
export class AuthResponseService {
    constructor(
        private _storage: AppStorage,
        private _timer: AuthTimerService,
    ) {}

    public processAuthentication(response: IAuthResponse): IAuthUser {
        const expirationDate = new Date(
            new Date().getTime() + +response.expiresIn * 1000,
        );
        const user = new AuthUser(
            response.email,
            response.localId,
            response.idToken,
            expirationDate,
        );
        this._timer.setTimer(expirationDate);
        this._storage.saveData(Vault.User, user);
        return user;
    }

    public processError(response: HttpErrorResponse): string {
        let message = "An unknown error has occurred!";
        if (response?.error?.error) {
            switch (response.error.error.message) {
                case "EMAIL_EXISTS":
                    message = "The email is already exists!";
                    break;
                case "OPERATION_NOT_ALLOWED":
                    message = "The operation is not allowed!";
                    break;
                case "TOO_MANY_ATTEMPTS_TRY_LATER":
                    message = "Too many attempts. Try later!";
                    break;
                case "EMAIL_NOT_FOUND":
                    message = "The email is not found!";
                    break;
                case "INVALID_PASSWORD":
                    message = "The password is incorrect!";
                    break;
                case "USER_DISABLED":
                    message = "The user account is disabled!";
                    break;
            }
        }
        return message;
    }
}
