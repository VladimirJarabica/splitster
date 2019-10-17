import { Config } from "../records/Config";
import { TestResult } from "./getTestResult";
export interface TestsResults {
    [id: string]: TestResult;
}
export declare const getTestsResults: (config: Config, userId: string) => {
    [x: string]: TestResult;
    [x: number]: TestResult;
};
