import { Injectable } from "@angular/core";
import { createFeatureSelector, createSelector } from "@ngrx/store";
import { Feature } from "../../shared/store/app.model";
import { IAuthState } from "../model/state.model";

@Injectable()
export class AuthSelectors {
    private auth = createFeatureSelector<IAuthState>(Feature.Auth);

    public user = createSelector(this.auth, state => state.user);
    public error = createSelector(this.auth, state => state.error);
}
