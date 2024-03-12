import { createAction, props } from "@ngrx/store";
import { IChartPoint, IChartSection } from "../model/chart.model";

const SET_YEAR         = "[Chart][Income] Set year";
const SET_POINTS       = "[Chart][Income] Set points";
const SET_SECTIONS     = "[Chart][Income] Set sections";
const PROCESS_YEAR     = "[Chart][Income] Process year";
const PROCESS_POINTS   = "[Chart][Income] Process points";
const PROCESS_SECTIONS = "[Chart][Income] Process sections";
const CLEAR            = "[Chart][Income] Clear";

export const setYear = createAction(
    SET_YEAR,
    props<{ payload: number | null }>(),
);
export const setPoints = createAction(
    SET_POINTS,
    props<{ payload: IChartPoint[] }>(),
);
export const setSections = createAction(
    SET_SECTIONS,
    props<{ payload: IChartSection[] }>(),
);
export const processYear = createAction(PROCESS_YEAR);
export const processPoints = createAction(PROCESS_POINTS);
export const processSections = createAction(PROCESS_SECTIONS);
export const clear = createAction(CLEAR);
