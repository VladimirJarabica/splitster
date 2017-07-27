// @flow
import type { Variant } from "../containers/TestFn"

type TestId = string
type VariantId = string
type GroupId = string
type TrackId = string

export type CookiesOptionsConfig = {|
  disable?: boolean,
  expiration?: number,
  name?: string, // Default "splitster"
|}

export type OptionsConfig = {|
  separateTest?: boolean,
  cookies?: CookiesOptionsConfig,
|}

export type Result = ?Variant

// TODO: add test result type
export type TrackConfig = (Result) => void
export type TracksConfig = { [TrackId]: TrackConfig }

export type TestTrackConfig = TrackId|TrackConfig
export type TestTracksConfig = TestTrackConfig|Array<TestTrackConfig>

export type UserGroupConfig = {
  [string]: any|Array<any>
}| (Object) => boolean
export type UserGroupsConfig = { [GroupId]: UserGroupConfig }

export type VariantConfig = {|
  def?: boolean,
  value: string,
  ratio: number,
|} | string
export type VariantsConfig = { [VariantId]: VariantConfig }

export type TestConfig = {|
  description?: string,
  userGroup?: GroupId|UserGroupConfig|Array<GroupId|UserGroupConfig>,
  usage?: number,
  runTrack?: TestTracksConfig,
  useTrack?: TestTracksConfig,
  endTrack?: TestTracksConfig,
  defaultVariant: string,
  variants: VariantsConfig,
|}
export type TestsConfig = { [TestId]: TestConfig }

export type Config = {|
  tests: TestsConfig,
  userGroups?: UserGroupsConfig,
  tracks?: TracksConfig,
  options?: OptionsConfig,
|}

export type SaveResults = { [string]: string }
