import { HttpParams } from "@angular/common/http";

export class HttpService {
    public getHttpParams(token: string): { params: HttpParams } {
        return {
            params: new HttpParams().set("auth", token),
        };
    }
}
