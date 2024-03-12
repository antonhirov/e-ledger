import { ErrorHandler, NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { HttpClientModule } from "@angular/common/http";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { StoreModule } from "@ngrx/store";
import { EffectsModule } from "@ngrx/effects";
import { StoreDevtoolsModule } from "@ngrx/store-devtools";

import { SharedModule } from "./shared/shared.module";
import { AuthModule } from "./auth/auth.module";
import { AppRoutingModule } from "./app-routing.module";
import { environment } from "../environments/environment";

import { AppComponent } from "./app.component";
import { CommonEffects } from "./shared/store/common.effects";
import { GlobalErrorHandler } from "./shared/error/error.handler";

@NgModule({
    declarations: [AppComponent],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        StoreModule.forRoot({}),
        EffectsModule.forRoot([CommonEffects]),
        StoreDevtoolsModule.instrument({ logOnly: environment.production }),
        SharedModule,
        AuthModule,
        AppRoutingModule,
    ],
    bootstrap: [AppComponent],
    providers: [{ provide: ErrorHandler, useClass: GlobalErrorHandler }],
})
export class AppModule {}
