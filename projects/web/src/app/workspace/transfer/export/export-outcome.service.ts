import { Injectable } from "@angular/core";
import { IOutcome } from "../../data/model/outcome.model";
import { IExportFilter, IExportService } from "../model/export.model";
import { Extension } from "../model/extension.model";
import { utils, WorkSheet } from "xlsx";
import * as _ from "lodash";

@Injectable()
export class ExportOutcomeService implements IExportService<IOutcome> {
    public getItems(filter: IExportFilter, items: IOutcome[]): IOutcome[] {
        return <IOutcome[]>_(items)
            .filter(
                (item: IOutcome): boolean =>
                    filter.from <= item.date && filter.to >= item.date,
            )
            .orderBy((item: IOutcome): Date => item.date, "desc")
            .value();
    }

    public getWorkSheet(filter: IExportFilter, items: IOutcome[]): WorkSheet {
        const header = ["Date", "Category", "Description", "Sum"];
        const columns = _.map(items, item => {
            return [
                item.date.toFullDateString(),
                item.category.name,
                item.description,
                item.sum,
            ];
        });
        columns.unshift(header);
        const ws = utils.aoa_to_sheet(columns);
        if (filter.extension == Extension.Xlsx) {
            const wscols = [{ wch: 10 }, { wch: 12 }, { wch: 20 }, { wch: 8 }];
            ws["!cols"] = wscols;
        }
        return ws;
    }
}
