import { Component, OnInit } from "@angular/core";
import { BsModalRef } from "ngx-bootstrap/modal";
import { Subject } from "rxjs";

@Component({
    selector: "el-confirm-dialog",
    templateUrl: "./confirm.dialog.html",
})
// eslint-disable-next-line @angular-eslint/component-class-suffix
export class ConfirmDialog implements OnInit {
    public confirmation$!: Subject<void>;
    public title?: string;
    public message?: string;

    constructor(public modalRef: BsModalRef) {}

    public ngOnInit(): void {
        this.confirmation$ = new Subject();
    }

    public onConfirm(): void {
        this.confirmation$.next();
    }
}
