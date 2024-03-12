import { Injectable, OnDestroy } from "@angular/core";
import { TypedAction } from "@ngrx/store/src/models";
import { Store } from "@ngrx/store";

import { Subscription } from "rxjs";
import { take } from "rxjs/operators";
import { BsModalService } from "ngx-bootstrap/modal";
import { ConfirmDialog } from "../../../shared/dialog/confirm.dialog";

@Injectable()
export class ListService implements OnDestroy {
    private _dialog: Subscription | null = null;

    constructor(
        private _modalService: BsModalService,
        private _store$: Store,
    ) {}

    public ngOnDestroy(): void {
        this.clearDialog();
    }

    public openDialog(
        id: string,
        sum: number,
        name: string,
        action: (props: { payload: string }) => {
            payload: string;
        } & TypedAction<string>,
    ): void {
        const dialogRef = this._modalService.show(ConfirmDialog, {
            initialState: {
                title: "Do you want to delete this item?:",
                message: `${name} - ${sum.toFixed(2)}`,
            },
            animated: true,
        });
        if (dialogRef.content) {
            this.clearDialog();
            this._dialog = dialogRef.content.confirmation$
                .pipe(take(1))
                .subscribe(() => {
                    this._store$.dispatch(action({ payload: id }));
                    dialogRef.hide();
                });
        }
    }

    private clearDialog(): void {
        if (this._dialog) {
            this._dialog.unsubscribe();
            this._dialog = null;
        }
    }
}
