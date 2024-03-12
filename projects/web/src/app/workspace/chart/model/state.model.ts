import { IChartPoint, IChartSection } from "./chart.model";

export interface IState {
    readonly year: number | null;
    readonly points: IChartPoint[];
    readonly sections: IChartSection[];
}

export interface IChartState {
    readonly income: IState;
    readonly outcome: IState;
}
