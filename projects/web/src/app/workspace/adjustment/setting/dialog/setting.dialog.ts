import { Component } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Store } from "@ngrx/store";
import { BsModalRef } from "ngx-bootstrap/modal";

import { AuthRequest } from "../../../../auth/model/request.model";
import { ISetting } from "../../model/setting.model";
import * as fromActions from "../../store/setting.actions";

@Component({
    selector: "el-setting-dialog",
    templateUrl: "./setting.dialog.html",
    styleUrls: ["./setting.dialog.scss"],
})
// eslint-disable-next-line @angular-eslint/component-class-suffix
export class SettingDialog {
    public setting?: ISetting;

    constructor(public modalRef: BsModalRef, private _store$: Store) {}

    public onSubmit(form: NgForm): void {
        if (form.valid && this.setting) {
            const email = form.value.email;
            const password = form.value.password;

            this._store$.dispatch(
                fromActions.loginUser({
                    payload: {
                        request: new AuthRequest(email, password),
                        setting: this.setting.copy(),
                    },
                }),
            );
            form.reset();
            this.modalRef.hide();
        }
    }
}
