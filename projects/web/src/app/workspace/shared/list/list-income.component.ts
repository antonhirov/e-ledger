import { Component, Input, OnDestroy, OnInit } from "@angular/core";
import { DefaultProjectorFn, MemoizedSelector, Store } from "@ngrx/store";
import { Subscription } from "rxjs";

import { ListService } from "./list.service";
import { IIncome } from "../../data/model/income.model";
import * as fromActions from "../../data/store/income.actions";

@Component({
    selector: "el-list-income",
    templateUrl: "./list-income.component.html",
    styleUrls: ["./list.component.scss"],
})
export class ListIncomeComponent implements OnInit, OnDestroy {
    private _sub!: Subscription;

    @Input()
    public selector!: MemoizedSelector<
        object,
        IIncome[],
        DefaultProjectorFn<IIncome[]>
    >;
    public items: IIncome[] = [];

    constructor(private _listService: ListService, private _store$: Store) {}

    public ngOnInit(): void {
        this._sub = this._store$.select(this.selector).subscribe(data => {
            this.items = data;
        });
    }

    public ngOnDestroy(): void {
        if (this._sub) {
            this._sub.unsubscribe();
        }
    }

    public onDelete(income: IIncome): void {
        this._listService.openDialog(
            income.id,
            income.sum,
            income.source.name,
            fromActions.deleteIncome,
        );
    }

    public trackById(_index: number, item: IIncome): string {
        return item.id;
    }
}
