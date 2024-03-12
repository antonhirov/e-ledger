import { format } from "date-fns";

export {};

declare global {
    interface Date {
        toDate(): Date;
        toDayShortMonthString(): string;
        toShortMonthString(): string;
        toFullDateString(): string;
    }
}

Date.prototype.toDate = function (): Date {
    return new Date(this.getFullYear(), this.getMonth(), this.getDate());
};

Date.prototype.toDayShortMonthString = function (): string {
    return format(this, "dd MMM");
};

Date.prototype.toShortMonthString = function (): string {
    return format(this, "MMM");
};

Date.prototype.toFullDateString = function (): string {
    return format(this, "dd/MM/yyyy");
};
