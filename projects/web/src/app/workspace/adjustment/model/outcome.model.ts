export interface ICategory {
    readonly id: number;
    readonly name: string;
}

export interface ICategoryView extends ICategory {
    readonly isDisabled: boolean;
}

export class Category implements ICategory {
    constructor(public readonly id: number, public readonly name: string) {}
}

export class CategoryView implements ICategoryView {
    constructor(
        public readonly id: number,
        public readonly name: string,
        public readonly isDisabled: boolean,
    ) {}
}
