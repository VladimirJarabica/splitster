// @flow
import type { Test } from '../containers/Test'

export type TestId = string
type VariantId = string
type GroupId = string
type TrackId = string

export type CookiesOptionsConfig = {|
  disabled?: boolean,
  expiration?: number,
  name?: string, // Default "splitster"
|}

export type OptionsConfig = {|
  separateTest?: boolean,
  cookies?: CookiesOptionsConfig,
|}

export type Result = Test

// TODO: add test result type
export type TrackConfig = Result => void
export type TracksConfig = { [TrackId]: TrackConfig }

export type TestTrackConfig = TrackId | TrackConfig
export type TestTracksConfig = TestTrackConfig | Array<TestTrackConfig>

export type UserGroupSubConfig =
  | {
      [string]: string | string[],
    }
  | (Object => boolean)
export type UserGroupConfig = UserGroupSubConfig[] | UserGroupSubConfig
export type UserGroupsConfig = { [GroupId]: UserGroupConfig }

export type VariantConfig =
  | {|
      value: string,
      ratio: number,
    |}
  // | string
  | number
export type VariantsConfig = { [VariantId]: VariantConfig }

export type TestUserGroupConfig =
  | GroupId
  | UserGroupConfig
  | Array<GroupId | UserGroupConfig>

export type TestConfig = {|
  description?: string,
  userGroup?: TestUserGroupConfig,
  usage?: number,
  runTrack?: TestTracksConfig,
  useTrack?: TestTracksConfig,
  endTrack?: TestTracksConfig,
  defaultVariant: string,
  variants: VariantsConfig,
  disabled?: boolean,
|}
export type TestsConfig = { [TestId]: TestConfig }

export type Config = {|
  tests: TestsConfig,
  userGroups?: UserGroupsConfig,
  tracks?: TracksConfig,
  options?: OptionsConfig,
|}

export type SaveResults = { [string]: string }
