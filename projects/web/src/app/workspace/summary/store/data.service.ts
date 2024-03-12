import { Injectable } from "@angular/core";
import { IEntity, IEntityFilter } from "../../data/model/state.model";
import { environment } from "projects/web/src/environments/environment";
import * as _ from "lodash";

@Injectable()
export class DataService {
    public getIds<F extends IEntityFilter, I extends IEntity>(
        filter: F,
        rawItems: I[],
    ): string[] {
        const items = filter.any()
            ? _.filter(rawItems, (item: I): boolean => filter.process(item))
            : rawItems;
        return _.map(
            _.orderBy(items, (item: I): Date => item.created, "desc"),
            (item: I): string => item.id,
        );
    }

    public getPageIds(page: number, ids: string[]): string[] {
        const itemsPerPage = environment.pageItemsCount;
        const start = page * itemsPerPage;
        const end = start + itemsPerPage;
        return _.slice(ids, start, end);
    }

    public checkActivePage(
        activePage: number,
        pagesCount: number,
    ): { payload: number } | null {
        return activePage >= pagesCount ? { payload: pagesCount - 1 } : null;
    }

    public selectActivePage(
        page: number,
        itemsCount: number,
    ): { payload: number } | null {
        return page >= 0 &&
            page < _.ceil(itemsCount / environment.pageItemsCount)
            ? { payload: page }
            : null;
    }
}
