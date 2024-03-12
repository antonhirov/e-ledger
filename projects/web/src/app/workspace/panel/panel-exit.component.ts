import { Component, OnDestroy, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { Subscription } from "rxjs";
import { take } from "rxjs/operators";

import { BsModalService } from "ngx-bootstrap/modal";
import { CommonSelectors } from "../data/store/common.selectors";
import { ConfirmDialog } from "../../shared/dialog/confirm.dialog";
import * as fromDataActions from "../data/store/common.actions";
import * as fromActions from "../../shared/store/common.actions";

@Component({
    templateUrl: "./panel-exit.component.html",
})
export class PanelExitComponent implements OnInit, OnDestroy {
    private _sub!: Subscription;
    private _dialog: Subscription | null = null;
    public isUnsaved = false;

    constructor(
        private _selectors: CommonSelectors,
        private _modalService: BsModalService,
        private _store$: Store,
    ) {}

    public ngOnInit(): void {
        this._sub = this._store$
            .select(this._selectors.isUnsaved)
            .subscribe(isUnsaved => {
                this.isUnsaved = isUnsaved;
            });
    }

    public ngOnDestroy(): void {
        if (this._sub) {
            this._sub.unsubscribe();
        }
        this.clearDialog();
    }

    public onSave(): void {
        this._store$.dispatch(fromDataActions.saveData());
    }

    public onLogout(): void {
        if (this.isUnsaved) {
            const dialogRef = this._modalService.show(ConfirmDialog, {
                initialState: {
                    title: "Warning!",
                    message: "Do you want to exit without saving?",
                },
                animated: true,
            });
            if (dialogRef.content) {
                this.clearDialog();
                this._dialog = dialogRef.content.confirmation$
                    .pipe(take(1))
                    .subscribe(() => {
                        this._store$.dispatch(fromActions.clear());
                        dialogRef.hide();
                    });
            }
        } else {
            this._store$.dispatch(fromActions.clear());
        }
    }

    private clearDialog(): void {
        if (this._dialog) {
            this._dialog.unsubscribe();
            this._dialog = null;
        }
    }
}
