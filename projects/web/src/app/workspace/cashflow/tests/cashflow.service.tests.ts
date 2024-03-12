import { NgForm } from "@angular/forms";
import { TestBed } from "@angular/core/testing";
import { provideMockStore, MockStore } from "@ngrx/store/testing";

import { IncomeData } from "../../data/model/income.model";
import { OutcomeData } from "../../data/model/outcome.model";
import { CashflowService } from "../cashflow.service";

jest.mock("@angular/forms");
jest.mock("../../data/model/income.model");
jest.mock("../../data/model/outcome.model");

describe("cashflow service", () => {
    let store: MockStore;
    const form = jest.mocked(NgForm);
    const income = jest.mocked(IncomeData);
    const outcome = jest.mocked(OutcomeData);
    const reset = jest.fn();

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [provideMockStore()],
        });
        store = TestBed.inject(MockStore);
        form.mockClear();
        income.mockClear();
        outcome.mockClear();
        reset.mockClear();
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    test("add income", () => {
        const dispatch = jest.spyOn(store, "dispatch");
        form.mockImplementation(() => {
            const original = jest.requireActual("@angular/forms");
            return {
                ...original,
                value: {
                    from: new Date(2000, 1, 1),
                    to: new Date(2000, 1, 1),
                    incomeSum: 100,
                    source: 0,
                },
                reset: reset,
            };
        });

        const service = new CashflowService(store);
        service.addIncome(new NgForm([], []));

        expect(dispatch).toHaveBeenCalled();
        expect(reset).toHaveBeenCalled();
        expect(income.mock.calls[0][0]).toEqual(new Date(2000, 1, 1));
        expect(income.mock.calls[0][1]).toEqual(new Date(2000, 1, 1));
        expect(income.mock.calls[0][2]).toBe(100);
        expect(income.mock.calls[0][3]).toBe(0);
    });

    test("not add income", () => {
        const dispatch = jest.spyOn(store, "dispatch");
        form.mockImplementation(() => {
            const original = jest.requireActual("@angular/forms");
            return {
                ...original,
                value: {
                    from: new Date(2000, 1, 1),
                    to: new Date(1999, 1, 1),
                    incomeSum: 100,
                    source: 0,
                },
                reset: reset,
            };
        });

        const service = new CashflowService(store);
        service.addIncome(new NgForm([], []));

        expect(dispatch).not.toHaveBeenCalled();
        expect(reset).not.toHaveBeenCalled();
        expect(income.mock.calls.length).toBe(0);
    });

    test("add outcome", () => {
        const dispatch = jest.spyOn(store, "dispatch");
        form.mockImplementation(() => {
            const original = jest.requireActual("@angular/forms");
            return {
                ...original,
                value: {
                    date: new Date(2011, 1, 1),
                    outcomeSum: 200,
                    category: 1,
                    description: "description",
                },
                reset: reset,
            };
        });

        const service = new CashflowService(store);
        service.addOutcome(new NgForm([], []));

        expect(dispatch).toHaveBeenCalled();
        expect(reset).toHaveBeenCalled();
        expect(outcome.mock.calls[0][0]).toEqual(new Date(2011, 1, 1));
        expect(outcome.mock.calls[0][1]).toBe(200);
        expect(outcome.mock.calls[0][2]).toBe(1);
        expect(outcome.mock.calls[0][3]).toBe("description");
    });
});
