import { Component, OnDestroy } from "@angular/core";
import { Subscription } from "rxjs";

import { AdjustmentMode } from "../mode/mode.model";
import { ModeService } from "../mode/mode.service";

@Component({
    templateUrl: "./panel-adjustment.component.html",
})
export class PanelAdjustmentComponent implements OnDestroy {
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

    public onSetSetting(): void {
        this._modeService.setAdjustmentMode(AdjustmentMode.Setting);
    }

    public onSetEnumeration(): void {
        this._modeService.setAdjustmentMode(AdjustmentMode.Enumeration);
    }
}
