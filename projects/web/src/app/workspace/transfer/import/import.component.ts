import { Component, OnDestroy, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Subscription } from "rxjs";

import { GlobalError } from "../../../shared/error/error.model";
import { CashflowMode } from "../../mode/mode.model";
import { ModeService } from "../../mode/mode.service";
import { ImportService } from "./import.service";

@Component({
    selector: "el-import",
    templateUrl: "./import.component.html",
    styleUrls: ["./import.component.scss"],
})
export class ImportComponent implements OnInit, OnDestroy {
    private _sub!: Subscription;
    private _file: File | null = null;

    public isIncome!: boolean;
    public isOutcome!: boolean;
    public formSubmitted!: boolean;

    constructor(
        private _importService: ImportService,
        private _modeService: ModeService,
    ) {}

    public ngOnInit(): void {
        this._sub = this._modeService.cashflowChange$.subscribe(mode => {
            this.isIncome = mode === CashflowMode.Income;
            this.isOutcome = mode === CashflowMode.Outcome;
        });
        this.formSubmitted = false;
    }

    public ngOnDestroy(): void {
        if (this._sub) {
            this._sub.unsubscribe();
        }
    }

    public onSubmit(form: NgForm): void {
        this.formSubmitted = true;
        form.control.markAllAsTouched();
        form.controls.file.markAsDirty();
        if (form.valid && this._file) {
            const isRewritten = !!form.value.isRewritten;
            this._importService.upload(
                this._file,
                this.isIncome,
                this.isOutcome,
                isRewritten,
            );
            form.reset();
            this.formSubmitted = false;
        }
    }

    public onFileChange(event: Event): void {
        this._file = null;
        const input = event.target as HTMLInputElement;
        if (input.files) {
            if (input.files.length === 1) {
                this._file = input.files[0];
            } else if (input.files.length > 1) {
                throw new GlobalError("Multiple files cannot be used!");
            }
        }
    }
}
