interface IEnumerationResponse {
    readonly id: number;
    readonly name: string;
}
export interface IIncomeResponse {
    readonly id: string;
    readonly created: string;
    readonly from: string;
    readonly to: string;
    readonly sum: number;
    readonly sumPerDay: number;
    readonly sourceId: number;
}

export interface IOutcomeResponse {
    readonly id: string;
    readonly created: string;
    readonly date: string;
    readonly sum: number;
    readonly description: string | undefined;
    readonly categoryId: number;
}

export interface IEnumerationsResponse {
    sources: IEnumerationResponse[];
    categories: IEnumerationResponse[];
}

export interface IEntitiesResponse {
    incomes: IIncomeResponse[];
    outcomes: IOutcomeResponse[];
}

export interface IDataResponse {
    enumerations: IEnumerationsResponse;
    entities: IEntitiesResponse;
}
