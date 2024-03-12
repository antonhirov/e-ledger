import { Component, HostListener, OnDestroy, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { Subscription } from "rxjs";
import { take } from "rxjs/operators";

import "../shared/extensions/number.extensions";
import "../shared/extensions/date.extensions";

import { BsModalService } from "ngx-bootstrap/modal";
import { ErrorDialog } from "../shared/error/dialog/error.dialog";
import { CommonSelectors } from "./data/store/common.selectors";
import * as fromActions from "./data/store/common.actions";
import * as _ from "lodash";

@Component({
    templateUrl: "./workspace.component.html",
    styleUrls: [
        "./scss/workspace.component.scss",
        "./scss/workspace-panel.component.scss",
        "./scss/workspace-container.component.scss",
    ],
})
export class WorkspaceComponent implements OnInit, OnDestroy {
    private _subs: Subscription[] = [];
    public isUnsaved = false;

    constructor(
        private _selectors: CommonSelectors,
        private _modalService: BsModalService,
        private _store$: Store,
    ) {}

    @HostListener("window:beforeunload")
    public unloadPage(): boolean {
        return !this.isUnsaved;
    }

    public ngOnInit(): void {
        this._subs.push(
            this._store$
                .select(this._selectors.isUnsaved)
                .subscribe(isUnsaved => {
                    this.isUnsaved = isUnsaved;
                }),
        );
        this._subs.push(
            this._store$.select(this._selectors.error).subscribe(message => {
                if (message) {
                    this.showErrorDialog(message);
                }
            }),
        );
        this._store$.dispatch(fromActions.loadData());
    }

    public ngOnDestroy(): void {
        _.forEach(this._subs, sub => {
            if (sub) {
                sub.unsubscribe();
            }
        });
    }

    private showErrorDialog(message: string): void {
        const modalRef = this._modalService.show(ErrorDialog, {
            initialState: { message: message },
            animated: true,
        });
        if (modalRef?.onHide) {
            modalRef.onHide.pipe(take(1)).subscribe(() => {
                this._store$.dispatch(fromActions.setError({ payload: null }));
            });
        }
    }
}
