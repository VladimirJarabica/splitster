import { Variants } from "./Variants";

export type UserGroup = string | number | (string | number)[];

export type UserGroups = { [property: string]: UserGroup };

export interface TestConfig {
  id: string;
  version: number;
  description: string;
  defaultVariant: string;
  variants: Variants;
  userGroup: UserGroups;
  userGroupExclude: UserGroups;
  usage: number | null;
  disabled: boolean;
}

export interface InputTestConfig {
  version?: number;
  description?: string;
  defaultVariant: string;
  variants: Variants;
  userGroup?: UserGroups;
  userGroupExclude?: UserGroups;
  usage?: number | null;
  disabled?: boolean;
}

export const getTestConfig = (
  id: string,
  inputTestConfig: InputTestConfig
): TestConfig => ({
  id,
  version: inputTestConfig.version || 0,
  description: inputTestConfig.description || "",
  defaultVariant: inputTestConfig.defaultVariant,
  variants: inputTestConfig.variants,
  userGroup: {},
  userGroupExclude: {},
  usage: inputTestConfig.usage || null,
  disabled: inputTestConfig.disabled || false
});
