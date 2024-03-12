import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { AdjustmentMode, CashflowMode } from "./mode.model";

@Injectable()
export class ModeService {
    public cashflowChange$: BehaviorSubject<CashflowMode>;
    public adjustmentChange$: BehaviorSubject<AdjustmentMode>;

    constructor() {
        this.cashflowChange$ = new BehaviorSubject<CashflowMode>(
            CashflowMode.Income,
        );
        this.adjustmentChange$ = new BehaviorSubject<AdjustmentMode>(
            AdjustmentMode.Setting,
        );
    }

    public setCashflowMode(mode: CashflowMode): void {
        this.cashflowChange$.next(mode);
    }

    public setAdjustmentMode(mode: AdjustmentMode): void {
        this.adjustmentChange$.next(mode);
    }
}
