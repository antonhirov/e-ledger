import { ISource } from "../../adjustment/model/income.model";
import { ICategory } from "../../adjustment/model/outcome.model";

export interface IImportService<T> {
    processItems(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        data: any[],
        list: ISource[] | ICategory[],
        items?: T[],
    ): { total: number; deleted: number };
}
