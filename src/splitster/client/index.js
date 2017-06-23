import SplitsterClient from "./SplitsterClient"

const splitsterInit = (config: Config, user: Object) => new SplitsterClient(config, user)

export default splitsterInit
