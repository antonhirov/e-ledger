import { NgForm } from "@angular/forms";
import { Component, OnDestroy, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { Subscription } from "rxjs";

import { AuthRequest } from "./model/request.model";
import { AuthErrorService } from "./auth-error.service";
import { authAnimations } from "./auth.animations";

import { AuthSelectors } from "./store/auth.selectors";
import { environment } from "../../environments/environment";
import * as fromActions from "../auth/store/auth.actions";

@Component({
    templateUrl: "./auth.component.html",
    styleUrls: ["./auth.component.scss"],
    animations: authAnimations,
})
export class AuthComponent implements OnInit, OnDestroy {
    private _sub!: Subscription;

    public formSubmitted!: boolean;
    public isSignUpMode = false;
    public extraError: string | null = null;
    public passwordMinLength = environment.passwordMinLength;

    constructor(
        private _selectors: AuthSelectors,
        private _errorService: AuthErrorService,
        private _store$: Store,
    ) {}

    public ngOnInit(): void {
        this.formSubmitted = false;
        this._sub = this._store$
            .select(this._selectors.error)
            .subscribe(error => {
                if (error) {
                    this.extraError = error;
                }
            });
    }

    public ngOnDestroy(): void {
        if (this._sub) {
            this._sub.unsubscribe();
        }
    }

    public onAuthSignUpChange(event: Event): void {
        const target = event.target as HTMLInputElement | null;
        if (target?.checked) {
            this.isSignUpMode = true;
        } else {
            this.isSignUpMode = false;
        }
        this.clearExtraError();
    }

    public onSubmit(form: NgForm): void {
        this.formSubmitted = true;
        form.control.markAllAsTouched();
        if (form.valid) {
            const request = new AuthRequest(
                form.value.email,
                form.value.password,
            );
            if (this.isSignUpMode) {
                this._store$.dispatch(
                    fromActions.signupStart({ payload: request }),
                );
            } else {
                this._store$.dispatch(
                    fromActions.loginStart({ payload: request }),
                );
            }
            form.reset();
            this.formSubmitted = false;
        }
    }

    public onFocus(): void {
        this.clearExtraError();
    }

    public trackByIndex(index: number): number {
        return index;
    }

    public getErrorMessages(form: NgForm): string[] {
        return this._errorService.getErrorMessages(form, this.extraError);
    }

    private clearExtraError(): void {
        if (this.extraError) {
            this.extraError = null;
        }
    }
}
