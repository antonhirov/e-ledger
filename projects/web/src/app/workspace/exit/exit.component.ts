import { Component, OnDestroy, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { differenceInSeconds } from "date-fns";
import { interval, Subscription } from "rxjs";

import { AuthTimerService } from "../../auth/auth-timer.service";
import { CommonSelectors } from "../data/store/common.selectors";

@Component({
    templateUrl: "./exit.component.html",
    styleUrls: ["./exit.component.scss"],
})
export class ExitComponent implements OnInit, OnDestroy {
    private _sub!: Subscription;
    private _interval: Subscription | null = null;

    private _time = 0;
    public minutes = 0;
    public seconds = 0;
    public status: "saved" | "unsaved" = "saved";

    constructor(
        private _selectors: CommonSelectors,
        private _timerService: AuthTimerService,
        private _store$: Store,
    ) {}

    public ngOnInit(): void {
        const expiration = this._timerService.expiration;
        if (expiration) {
            const now = new Date();
            if (expiration > now) {
                this._time = differenceInSeconds(expiration, now);
                this.processTime();
                this._interval = interval(1000).subscribe(() => {
                    if (this._time > 0) {
                        this._time--;
                        this.processTime();
                    } else {
                        this.clearInterval();
                    }
                });
            }
        }
        this._sub = this._store$
            .select(this._selectors.isUnsaved)
            .subscribe(isUnsaved => {
                this.status = isUnsaved ? "unsaved" : "saved";
            });
    }

    public ngOnDestroy(): void {
        this.clearInterval();
        if (this._sub) {
            this._sub.unsubscribe();
        }
    }

    private processTime(): void {
        this.minutes = Math.floor(this._time / 60);
        this.seconds = this._time - this.minutes * 60;
    }

    private clearInterval(): void {
        if (this._interval) {
            this._interval.unsubscribe();
            this._interval = null;
        }
    }
}
