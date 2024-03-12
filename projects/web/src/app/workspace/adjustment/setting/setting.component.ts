import { Component, OnDestroy, OnInit } from "@angular/core";
import { NgForm, NgModel } from "@angular/forms";
import { Store } from "@ngrx/store";
import { Subscription } from "rxjs";

import { SettingService } from "./setting.service";
import { ControlErrorService } from "../../../shared/control/control-error.service";
import { ISettingView, SettingView } from "../model/setting-view.model";
import { SyncPeriodView } from "../model/sync-period.model";

import { SettingSelectors } from "../store/setting.selectors";
import { AuthSelectors } from "../../../auth/store/auth.selectors";
import { environment } from "projects/web/src/environments/environment";
import * as fromActions from "../store/setting.actions";
import * as _ from "lodash";

@Component({
    selector: "el-setting",
    templateUrl: "./setting.component.html",
    styleUrls: ["./setting.component.scss"],
})
export class SettingsComponent implements OnInit, OnDestroy {
    private _subs: Subscription[] = [];

    public formSubmitted!: boolean;
    public setting!: ISettingView;
    public syncPeriods!: SyncPeriodView[];
    public passwordMinLength = environment.passwordMinLength;

    constructor(
        private _adjustmentSelectors: SettingSelectors,
        private _authSelectors: AuthSelectors,
        private _settingService: SettingService,
        private _errorService: ControlErrorService,
        private _store$: Store,
    ) {}

    public ngOnInit(): void {
        this.formSubmitted = false;
        this.setting = new SettingView();
        this.syncPeriods = this._settingService.getPeriods();

        this._subs.push(
            this._store$.select(this._authSelectors.user).subscribe(user => {
                this.setting.setEmail(user?.email || "");
            }),
        );
        this._subs.push(
            this._store$
                .select(this._adjustmentSelectors.syncPeriod)
                .subscribe(period => {
                    this.setting.setPeriod(period);
                }),
        );
        this._subs.push(
            this._store$
                .select(this._adjustmentSelectors.status)
                .subscribe(status => {
                    this._settingService.showDialog(status, this.setting.get());
                }),
        );
    }

    public ngOnDestroy(): void {
        _.forEach(this._subs, sub => {
            if (sub) {
                sub.unsubscribe();
            }
        });
    }

    public onSubmit(form: NgForm): void {
        this.formSubmitted = true;
        form.control.markAllAsTouched();
        if (form.valid) {
            this._store$.dispatch(
                fromActions.save({
                    payload: this.setting.get(),
                }),
            );
            this.formSubmitted = false;
        }
    }

    public onCancel(): void {
        this.setting.reset();
        this.formSubmitted = false;
    }

    public getErrorMessage(item: NgModel): string {
        return this._errorService
            .getErrorMessages(item.name, item.control)
            .join(" ");
    }

    public trackById(_index: number, item: SyncPeriodView): number {
        return item.id;
    }
}
