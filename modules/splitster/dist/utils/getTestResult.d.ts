import { TestConfig } from "../records/TestConfig";
export declare const getSeedNumber: (key: string) => number;
export interface TestResult {
    disabled: boolean;
    disabledReason: string | null;
    value: string;
}
interface Input {
    testConfig: TestConfig;
    userId: string;
    override?: {
        [testAndVersion: string]: string;
    };
}
export declare const getTestResult: ({ testConfig, userId, override }: Input) => TestResult;
export {};
