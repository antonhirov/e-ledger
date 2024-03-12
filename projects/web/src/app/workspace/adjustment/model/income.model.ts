export interface ISource {
    readonly id: number;
    readonly name: string;
}

export interface ISourceView extends ISource {
    readonly isDisabled: boolean;
}

export class Source implements ISource {
    constructor(public readonly id: number, public readonly name: string) {}
}

export class SourceView implements ISourceView {
    constructor(
        public readonly id: number,
        public readonly name: string,
        public readonly isDisabled: boolean,
    ) {}
}
