import { Injectable, OnDestroy } from "@angular/core";
import { Store } from "@ngrx/store";

import { interval, Subscription } from "rxjs";
import { SyncPeriod } from "../adjustment/model/sync-period.model";
import * as fromActions from "./store/common.actions";

@Injectable()
export class DataTimerService implements OnDestroy {
    private _timer: Subscription | null = null;
    private _period: SyncPeriod = SyncPeriod.Never;

    constructor(private _store$: Store) {}

    public ngOnDestroy(): void {
        this.clearTimer();
    }

    public setTimer(period: SyncPeriod): void {
        if (period) {
            if (period !== this._period) {
                this.clearTimer();
                const milliseconds = period * 60 * 1000;
                this._timer = interval(milliseconds).subscribe(() => {
                    this._store$.dispatch(fromActions.syncData());
                });
            }
        } else {
            this.clearTimer();
        }
        this._period = period;
    }

    public clearTimer(): void {
        if (this._timer) {
            this._timer.unsubscribe();
            this._timer = null;
        }
    }
}
