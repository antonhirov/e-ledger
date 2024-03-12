import { Injectable } from "@angular/core";
import { IAuthResponse } from "../../auth/model/response.model";
import { ISettingResponse } from "./model/response.model";

@Injectable()
export class AdjustmentResponseService {
    public isUserResponse(response: IAuthResponse | ISettingResponse): boolean {
        return !!(
            response.email &&
            response.localId &&
            response.idToken &&
            response.expiresIn
        );
    }

    public isReAuthRequired(message: string): boolean {
        return (
            message === "CREDENTIAL_TOO_OLD_LOGIN_AGAIN" ||
            message === "INVALID_ID_TOKEN" ||
            message === "TOKEN_EXPIRED"
        );
    }
}
