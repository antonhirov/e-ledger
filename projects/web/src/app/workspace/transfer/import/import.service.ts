import { Injectable } from "@angular/core";
import { DefaultProjectorFn, MemoizedSelector, Store } from "@ngrx/store";
import { BsModalService } from "ngx-bootstrap/modal";
import { take } from "rxjs/operators";
import { read, utils } from "xlsx";

import { IImportService } from "../model/import.model";
import { ISource } from "../../adjustment/model/income.model";
import { ICategory } from "../../adjustment/model/outcome.model";
import { GlobalError } from "../../../shared/error/error.model";

import { ImportIncomeService } from "./import-income.service";
import { ImportOutcomeService } from "./import-outcome.service";
import { MessageDialog } from "../../../shared/dialog/message.dialog";

import { TransferSelectors } from "../store/transfer.selectors";
import { EnumerationSelectors } from "../../adjustment/store/enumeration.selectors";

@Injectable()
export class ImportService {
    constructor(
        private _transferSelectors: TransferSelectors,
        private _enumerationSelectors: EnumerationSelectors,
        private _incomeService: ImportIncomeService,
        private _outcomeService: ImportOutcomeService,
        private _modalService: BsModalService,
        private _store$: Store,
    ) {}

    public upload(
        file: File,
        isIncome: boolean,
        isOutcome: boolean,
        isRewritten: boolean,
    ): void {
        const reader = new FileReader();
        reader.onload = (event): void => {
            try {
                const wb = read(event.target?.result);
                const wsName = wb.SheetNames[0];
                const ws = wb.Sheets[wsName];
                const data = utils.sheet_to_json(ws);
                if (isIncome) {
                    this.processData(
                        data,
                        this._incomeService,
                        isRewritten
                            ? this._transferSelectors.incomes
                            : this._enumerationSelectors.sources,
                    );
                }
                if (isOutcome) {
                    this.processData(
                        data,
                        this._outcomeService,
                        isRewritten
                            ? this._transferSelectors.outcomes
                            : this._enumerationSelectors.categories,
                    );
                }
            } catch {
                throw new GlobalError("Invalid input file!");
            }
        };
        reader.readAsArrayBuffer(file);
    }

    private processData<T>(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        data: any[],
        service: IImportService<T>,
        selector: MemoizedSelector<
            object,
            | { items: T[]; list: ISource[] | ICategory[] }
            | ISource[]
            | ICategory[],
            DefaultProjectorFn<
                | {
                      items: T[];
                      list: ISource[] | ICategory[];
                  }
                | ISource[]
                | ICategory[]
            >
        >,
    ): void {
        this._store$
            .select(selector)
            .pipe(take(1))
            .subscribe(info => {
                try {
                    this.showDialog(
                        "items" in info
                            ? service.processItems(data, info.list, info.items)
                            : service.processItems(data, info),
                    );
                } catch {
                    throw new GlobalError("Invalid input file!");
                }
            });
    }

    private showDialog(result: { total: number; deleted: number }): void {
        const replaced =
            result.deleted > 0 ? ` (${result.deleted} items replaced)` : "";
        this._modalService.show(MessageDialog, {
            initialState: {
                title: "Import completed:",
                message: `${result.total} items were added${replaced}.`,
            },
            animated: true,
        });
    }
}
