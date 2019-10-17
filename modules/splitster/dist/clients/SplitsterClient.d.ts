import { InputConfig, Config } from "../records/Config";
import { TestsResults } from "../utils/getTestsResults";
import { TestResult } from "../utils/getTestResult";
export interface ConstructorInput {
    isSimple?: boolean;
    config: InputConfig;
    user?: any;
    userId: string;
}
export declare class SplitsterClient {
    results: TestsResults;
    config: Config | null;
    user: any | null;
    userId: string | null;
    constructor({ isSimple, config, user, userId }: ConstructorInput);
    get(testId: string): TestResult;
}
