import { Component, Input, OnDestroy, OnInit } from "@angular/core";
import { DefaultProjectorFn, MemoizedSelector, Store } from "@ngrx/store";
import { Subscription } from "rxjs";

import { ListService } from "./list.service";
import { IOutcome } from "../../data/model/outcome.model";
import { environment } from "projects/web/src/environments/environment";
import * as fromActions from "../../data/store/outcome.actions";

@Component({
    selector: "el-list-outcome",
    templateUrl: "./list-outcome.component.html",
    styleUrls: ["./list.component.scss"],
})
export class ListOutcomeComponent implements OnInit, OnDestroy {
    private _sub!: Subscription;

    @Input()
    public selector!: MemoizedSelector<
        object,
        IOutcome[],
        DefaultProjectorFn<IOutcome[]>
    >;
    public items: IOutcome[] = [];
    public truncateLength = environment.truncateLength;

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

    public onDelete(outcome: IOutcome): void {
        this._listService.openDialog(
            outcome.id,
            outcome.sum,
            outcome.category.name,
            fromActions.deleteOutcome,
        );
    }

    public trackById(_index: number, item: IOutcome): string {
        return item.id;
    }
}
