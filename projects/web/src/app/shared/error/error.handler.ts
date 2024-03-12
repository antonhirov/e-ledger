import { ErrorHandler, Inject, Injectable, Injector } from "@angular/core";
import { BsModalService } from "ngx-bootstrap/modal";

import { GlobalError } from "./error.model";
import { ErrorDialog } from "./dialog/error.dialog";
import { environment } from "../../../environments/environment";

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
    private get _modalService(): BsModalService {
        return this._injector.get(BsModalService);
    }

    constructor(@Inject(Injector) private readonly _injector: Injector) {}

    public handleError(error: unknown): void {
        this._modalService.show(ErrorDialog, {
            initialState: { message: this.getMessage(error) },
            animated: true,
        });
    }

    private getMessage(error: unknown): string {
        if (error instanceof GlobalError) {
            return error.notation;
        } else {
            if (environment.production) {
                return "An unknown error has occurred!";
            } else {
                return error instanceof Error
                    ? error.message
                    : (error as object).toString();
            }
        }
    }
}
