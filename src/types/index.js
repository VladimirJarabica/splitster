// @flow
type TestsId = string
type VariantId = string
type GroupId = string
type TrackId = string

export type OptionsConfig = {|
  separateTest: boolean,
|}

// TODO: add test result type
export type TrackConfig = (Object) => void
export type TracksConfig = { [TrackId]: TrackConfig }

export type TestTrackConfig = TrackId|TrackConfig
export type TestTracksConfig = TestTrackConfig|Array<TestTrackConfig>

export type UserGroupConfig = {
  [string]: any|Array<any>
}| (Object) => boolean

export type VariantConfig = {|
  def?: boolean,
  value: string,
  ratio: number,
|}

export type TestConfig = {|
  description?: string,
  userGroup?: GroupId|UserGroupConfig|Array<GroupId|UserGroupConfig>,
  usage?: number,
  runTrack?: TrackId|TrackConfig|Array<TrackId|TrackConfig>,
  useTrack?: TrackId|TrackConfig|Array<TrackId|TrackConfig>,
  endTrack?: TrackId|TrackConfig|Array<TrackId|TrackConfig>,
  variants: { [VariantId]: VariantConfig },
|}

export type Config = {|
  tests: { [TestsId]: TestConfig },
  userGroups?: { [GroupId]: UserGroupConfig },
  tracks?: TracksConfig,
  options?: OptionsConfig,
|}