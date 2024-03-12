import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { take } from "rxjs/operators";
import { BsModalService } from "ngx-bootstrap/modal";

import { ISetting } from "../model/setting.model";
import { DialogMode } from "../model/dialog-mode.model";
import { SettingDialog } from "./dialog/setting.dialog";
import { ErrorDialog } from "../../../shared/error/dialog/error.dialog";
import { AdjustmentService } from "../adjustment.service";
import * as fromActions from "../store/setting.actions";

@Injectable()
export class SettingDialogService {
    constructor(
        private _adjustmentService: AdjustmentService,
        private _modalService: BsModalService,
        private _store$: Store,
    ) {}

    public showSavedDialog(): void {
        const modalRef = this._adjustmentService.showSavedDialog();
        if (modalRef?.onHide) {
            modalRef.onHide.pipe(take(1)).subscribe(() => {
                this.setNoneMode();
            });
        }
    }

    public showReAuthDialog(setting: ISetting): void {
        const modalRef = this._modalService.show(SettingDialog, {
            initialState: { setting: setting },
            animated: true,
        });
        if (modalRef?.onHide) {
            modalRef.onHide.pipe(take(1)).subscribe(() => {
                this.setNoneMode();
            });
        }
    }

    public showErrorDialog(message: string): void {
        const modalRef = this._modalService.show(ErrorDialog, {
            initialState: { message: message },
            animated: true,
        });
        if (modalRef?.onHide) {
            modalRef.onHide.pipe(take(1)).subscribe(() => {
                this._store$.dispatch(fromActions.clearError());
            });
        }
    }

    private setNoneMode(): void {
        this._store$.dispatch(
            fromActions.setMode({ payload: DialogMode.None }),
        );
    }
}
