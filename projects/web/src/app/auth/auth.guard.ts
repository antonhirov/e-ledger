import { Injectable } from "@angular/core";
import { CanActivate, Router, UrlTree } from "@angular/router";
import { Store } from "@ngrx/store";

import { Observable } from "rxjs";
import { map, take } from "rxjs/operators";
import { AuthSelectors } from "./store/auth.selectors";

@Injectable({ providedIn: "root" })
export class AuthGuard implements CanActivate {
    constructor(
        private _selectors: AuthSelectors,
        private _router: Router,
        private _store$: Store,
    ) {}

    public canActivate():
        | boolean
        | UrlTree
        | Observable<boolean | UrlTree>
        | Promise<boolean | UrlTree> {
        return this._store$.select(this._selectors.user).pipe(
            take(1),
            map(user => {
                return user ? true : this._router.createUrlTree(["/auth"]);
            }),
        );
    }
}
