import { Component, OnDestroy } from "@angular/core";
import { Subscription } from "rxjs";

import { AdjustmentMode } from "../mode/mode.model";
import { ModeService } from "../mode/mode.service";

@Component({
    templateUrl: "./adjustment.component.html",
    styleUrls: ["./adjustment.component.scss"],
})
export class AdjustmentComponent implements OnDestroy {
    private _sub!: Subscription;

    public isSetting!: boolean;
    public isEnumeration!: boolean;

    constructor(private _modeService: ModeService) {
        this._sub = this._modeService.adjustmentChange$.subscribe(mode => {
            this.isSetting = mode === AdjustmentMode.Setting;
            this.isEnumeration = mode === AdjustmentMode.Enumeration;
        });
    }

    public ngOnDestroy(): void {
        if (this._sub) {
            this._sub.unsubscribe();
        }
    }
}
