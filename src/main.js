// Default export - init of splitster app
export { default } from "./splitster/client"
// Server export
export { default as server } from "./splitster/server"

// Types exports:
// Splitster
// Config
// Test
// Variant
// Track
// Options
// ...
export type {
  Config,
  TestConfig,
  VariantConfig,
  UserGroupConfig,
  TrackConfig,
  OptionsConfig,
} from "./types"