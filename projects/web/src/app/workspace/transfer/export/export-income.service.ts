import { Injectable } from "@angular/core";
import { IIncome } from "../../data/model/income.model";
import { IExportFilter, IExportService } from "../model/export.model";
import { Extension } from "../model/extension.model";
import { utils, WorkSheet } from "xlsx";
import * as _ from "lodash";

@Injectable()
export class ExportIncomeService implements IExportService<IIncome> {
    public getItems(filter: IExportFilter, items: IIncome[]): IIncome[] {
        return <IIncome[]>_(items)
            .filter(
                (item: IIncome): boolean =>
                    filter.from <= item.to && filter.to >= item.from,
            )
            .orderBy((item: IIncome): Date => item.from, "desc")
            .value();
    }

    public getWorkSheet(filter: IExportFilter, items: IIncome[]): WorkSheet {
        const header = ["From", "To", "Source", "Sum"];
        const columns = _.map(items, item => {
            return [
                item.from.toFullDateString(),
                item.to.toFullDateString(),
                item.source.name,
                item.sum,
            ];
        });
        columns.unshift(header);
        const ws = utils.aoa_to_sheet(columns);
        if (filter.extension == Extension.Xlsx) {
            const wscols = [{ wch: 10 }, { wch: 10 }, { wch: 12 }, { wch: 8 }];
            ws["!cols"] = wscols;
        }
        return ws;
    }
}
