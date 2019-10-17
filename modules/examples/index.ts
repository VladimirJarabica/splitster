import { SplitsterClient } from "@splitster/splitster";

const s = new SplitsterClient({
  config: { tests: {} },
  userId: "johnie",
  isSimple: false
});
console.log("splitster", s);
