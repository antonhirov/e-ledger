export class GlobalError extends Error {
    constructor(public notation: string) {
        super(notation);
    }
}
