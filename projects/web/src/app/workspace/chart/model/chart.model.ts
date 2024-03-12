export interface IItem<T> {
    readonly key: T;
    readonly value: number;
    readonly name?: string;
}

export interface IChartPoint {
    readonly x: string;
    readonly y: number;
}

export interface IChartSection {
    readonly name: string;
    readonly value: number;
}

export class Item<T> implements IItem<T> {
    constructor(
        public readonly key: T,
        public readonly value: number,
        public readonly name?: string,
    ) {}
}

export class ChartPoint implements IChartPoint {
    public readonly x: string;
    public readonly y: number;

    constructor(x: string, y: number) {
        this.x = x;
        this.y = y.round2();
    }
}

export class ChartSection implements IChartSection {
    public readonly name: string;
    public readonly value: number;

    constructor(name: string, rate: number, value: number) {
        this.name = `${name} (${rate.toFixed(2)}%)`;
        this.value = value.round2();
    }
}
