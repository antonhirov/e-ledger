export {};

declare global {
    interface Number {
        round2(): number;
    }
}

Number.prototype.round2 = function (): number {
    return Math.round(Number(this) * 100) / 100;
};
