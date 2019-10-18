import { SplitsterClient } from "@splitster/splitster";

const s = new SplitsterClient({
  config: {
    tests: {
      splitster_ab: {
        // disabled: true,
        variants: {
          a: 1,
          b: 1
        },
        defaultVariant: "a"
      }
    }
  },
  userId: "johnie",
  isSimple: false,
  override: { splitster_ab: "kekecina" }
});
const clone = s.clone();
clone.userId = "kek";
console.log(clone === s);
console.log(s);
console.log(clone);
// console.log("splitster", s);
// console.log(s.getSaveResults());
// console.log(s.get("splitster_ab"));
// console.log(s.get("kek"));
