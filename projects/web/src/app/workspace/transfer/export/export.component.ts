import { Component, OnDestroy, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Subscription } from "rxjs";

import { CashflowMode } from "../../mode/mode.model";
import { Extension } from "../model/extension.model";
import { ExportFilter } from "../model/export.model";
import { ModeService } from "../../mode/mode.service";
import { ExportService } from "./export.service";

@Component({
    selector: "el-export",
    templateUrl: "./export.component.html",
    styleUrls: ["./export.component.scss"],
})
export class ExportComponent implements OnInit, OnDestroy {
    private _sub!: Subscription;

    public isIncome!: boolean;
    public isOutcome!: boolean;
    public formSubmitted!: boolean;
    public extensions!: Extension[];

    constructor(
        private _exportService: ExportService,
        private _modeService: ModeService,
    ) {}

    public ngOnInit(): void {
        this._sub = this._modeService.cashflowChange$.subscribe(mode => {
            this.isIncome = mode === CashflowMode.Income;
            this.isOutcome = mode === CashflowMode.Outcome;
        });
        this.formSubmitted = false;
        this.extensions = [Extension.Xlsx, Extension.Csv];
    }

    public ngOnDestroy(): void {
        if (this._sub) {
            this._sub.unsubscribe();
        }
    }

    public onSubmit(form: NgForm): void {
        this.formSubmitted = true;
        form.control.markAllAsTouched();
        form.controls.from.markAsDirty();
        form.controls.to.markAsDirty();
        if (form.valid) {
            const value = form.value;
            const extension = value.extension as Extension;
            this._exportService.download(
                new ExportFilter(
                    new Date(value.from).toDate(),
                    new Date(value.to).toDate(),
                    extension,
                ),
                this.isIncome,
                this.isOutcome,
            );
            form.reset();
            this.formSubmitted = false;
        }
    }

    public trackByIndex(index: number): number {
        return index;
    }
}
