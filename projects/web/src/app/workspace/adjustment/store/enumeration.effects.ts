import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";

import { map } from "rxjs/operators";
import * as fromDataActions from "../../data/store/common.actions";
import * as fromActions from "./enumeration.actions";

@Injectable()
export class EnumerationEffects {
    constructor(private _actions$: Actions) {}

    setEnums$ = createEffect(() => {
        return this._actions$.pipe(
            ofType(fromActions.setEnums),
            map(() => fromDataActions.setUnsaved()),
        );
    });
}
