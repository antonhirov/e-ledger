import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs";

import { CashflowMode } from "../mode/mode.model";
import { ModeService } from "../mode/mode.service";

@Component({
    templateUrl: "./panel-cashflow.component.html",
})
export class PanelCashflowComponent implements OnInit, OnDestroy {
    private _sub!: Subscription;

    public isIncome!: boolean;
    public isOutcome!: boolean;

    constructor(private _modeService: ModeService) {}

    public ngOnInit(): void {
        this._sub = this._modeService.cashflowChange$.subscribe(mode => {
            this.isIncome = mode === CashflowMode.Income;
            this.isOutcome = mode === CashflowMode.Outcome;
        });
    }

    public ngOnDestroy(): void {
        if (this._sub) {
            this._sub.unsubscribe();
        }
    }

    public onSetIncome(): void {
        this._modeService.setCashflowMode(CashflowMode.Income);
    }

    public onSetOutcome(): void {
        this._modeService.setCashflowMode(CashflowMode.Outcome);
    }
}
