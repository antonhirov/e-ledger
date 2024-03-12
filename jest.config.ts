import type { Config } from "jest";

const config: Config = {
    preset: "jest-preset-angular",
    setupFilesAfterEnv: ["<rootDir>/setup-jest.ts"],
    globalSetup: "jest-preset-angular/global-setup",
    testMatch: ["<rootDir>/projects/web/src/app/**/tests/*tests.ts"],
    globals: {
        "ts-jest": {
            tsconfig: "<rootDir>/projects/web/tsconfig.spec.json",
        },
    },
    transformIgnorePatterns: ["node_modules/(?!@angular|@ngrx|uuid)"],
    collectCoverageFrom: ["<rootDir>/projects/web/src/app/**/*.ts"],
    reporters: [
        "default",
        [
            "jest-junit",
            { suiteName: "E~Ledger tests", outputName: "tests.xml" },
        ],
    ],
};

export default config;
