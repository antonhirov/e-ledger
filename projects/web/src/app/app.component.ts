import { Component, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";

import * as fromActions from "./auth/store/auth.actions";

@Component({
    selector: "el-root",
    template: "<div class='container'><router-outlet></router-outlet></div>",
})
export class AppComponent implements OnInit {
    constructor(private _store$: Store) {}

    public ngOnInit(): void {
        this._store$.dispatch(fromActions.loginAuto());
    }
}
