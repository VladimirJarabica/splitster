import { TestConfig, InputTestConfig } from "./TestConfig";
export interface InputConfig {
    tests: {
        [id: string]: InputTestConfig;
    };
    options?: {
        cookies?: {
            disabled?: boolean;
            expiration?: number;
            name?: string;
        };
    };
}
export interface Config {
    tests: {
        [id: string]: TestConfig;
    };
    options: {
        cookies: {
            disabled: boolean;
            expiration: number;
            name: string;
        };
    };
}
export declare const getTestsConfig: (configTests: {
    [id: string]: InputTestConfig;
}) => {
    [id: string]: TestConfig;
};
export declare const getConfig: (inputConfig: InputConfig) => Config;
