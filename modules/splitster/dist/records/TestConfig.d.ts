import { Variants } from "./Variants";
export interface TestConfig {
    id: string;
    version: number;
    description: string;
    defaultVariant: string;
    variants: Variants;
    usage: number | null;
    disabled: boolean;
}
export interface InputTestConfig {
    version?: number;
    description?: string;
    defaultVariant: string;
    variants: Variants;
    usage?: number | null;
    disabled?: boolean;
}
export declare const getTestConfig: (id: string, inputTestConfig: InputTestConfig) => TestConfig;
