import { Extension } from "./extension.model";
import { WorkSheet } from "xlsx";

export interface IExportFilter {
    readonly from: Date;
    readonly to: Date;
    readonly extension: Extension;
}

export interface IExportService<T> {
    getItems(filter: IExportFilter, items: T[]): T[];
    getWorkSheet(filter: IExportFilter, items: T[]): WorkSheet;
}

export class ExportFilter implements IExportFilter {
    constructor(
        public readonly from: Date,
        public readonly to: Date,
        public readonly extension: Extension,
    ) {}
}
