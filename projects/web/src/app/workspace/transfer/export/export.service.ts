import { Injectable } from "@angular/core";
import { DefaultProjectorFn, MemoizedSelector, Store } from "@ngrx/store";
import { BsModalService } from "ngx-bootstrap/modal";
import { take } from "rxjs/operators";
import { writeFile, utils } from "xlsx";

import { GlobalError } from "../../../shared/error/error.model";
import { IExportFilter, IExportService } from "../model/export.model";
import { MessageDialog } from "../../../shared/dialog/message.dialog";

import { ExportIncomeService } from "../export/export-income.service";
import { ExportOutcomeService } from "../export/export-outcome.service";

import { IncomeSelectors } from "../../data/store/income.selectors";
import { OutcomeSelectors } from "../../data/store/outcome.selectors";

@Injectable()
export class ExportService {
    constructor(
        private _incomeSelectors: IncomeSelectors,
        private _outcomeSelectors: OutcomeSelectors,
        private _incomeService: ExportIncomeService,
        private _outcomeService: ExportOutcomeService,
        private _modalService: BsModalService,
        private _store$: Store,
    ) {}

    public download(
        filter: IExportFilter,
        isIncome: boolean,
        isOutcome: boolean,
    ): void {
        if (filter.from <= filter.to) {
            if (isIncome) {
                const incomeSelector = this._incomeSelectors.items;
                this.process(filter, this._incomeService, incomeSelector);
            }
            if (isOutcome) {
                const outcomeSelector = this._outcomeSelectors.items;
                this.process(filter, this._outcomeService, outcomeSelector);
            }
        } else {
            throw new GlobalError("Invalid input data!");
        }
    }

    private process<T>(
        filter: IExportFilter,
        service: IExportService<T>,
        selector: MemoizedSelector<object, T[], DefaultProjectorFn<T[]>>,
    ): void {
        this._store$
            .select(selector)
            .pipe(take(1))
            .subscribe(data => {
                const items = service.getItems(filter, data);
                const ws = service.getWorkSheet(filter, items);
                const wb = utils.book_new();

                utils.book_append_sheet(wb, ws, "Data");
                writeFile(wb, `workbook.${filter.extension}`);
                this.showDialog(items.length);
            });
    }

    private showDialog(count: number): void {
        this._modalService.show(MessageDialog, {
            initialState: {
                title: "Export completed:",
                message: `${count} items were selected.`,
            },
            animated: true,
        });
    }
}
