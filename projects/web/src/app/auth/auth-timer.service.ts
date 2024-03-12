import { Injectable, OnDestroy } from "@angular/core";
import { Store } from "@ngrx/store";

import { Subscription, timer } from "rxjs";
import * as fromActions from "../shared/store/common.actions";

@Injectable()
export class AuthTimerService implements OnDestroy {
    private _timer: Subscription | null = null;
    private _expiration: Date | null = null;

    public get expiration(): Date | null {
        return this._expiration;
    }

    constructor(private _store$: Store) {}

    public ngOnDestroy(): void {
        this.clearTimer();
    }

    public setTimer(expiration: Date): void {
        this.clearTimer();
        this._expiration = expiration;
        this._timer = timer(expiration).subscribe(() => {
            this._store$.dispatch(fromActions.clear());
        });
    }

    public clearTimer(): void {
        if (this._timer) {
            this._timer.unsubscribe();
            this._timer = null;
        }
    }
}
