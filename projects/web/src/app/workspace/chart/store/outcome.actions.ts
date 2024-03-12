import { createAction, props } from "@ngrx/store";
import { IChartPoint, IChartSection } from "../model/chart.model";

const SET_YEAR         = "[Chart][Outcome] Set year";
const SET_POINTS       = "[Chart][Outcome] Set points";
const SET_SECTIONS     = "[Chart][Outcome] Set sections";
const PROCESS_YEAR     = "[Chart][Outcome] Process year";
const PROCESS_POINTS   = "[Chart][Outcome] Process points";
const PROCESS_SECTIONS = "[Chart][Outcome] Process sections";
const CLEAR            = "[Chart][Outcome] Clear";

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
