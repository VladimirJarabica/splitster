import Test from "./containers/Test"
import SplitsterState from "./state/SplitsterState"

let state: SplitsterState | null = null

export const init = () => {
	state = new SplitsterState()
	console.log("init", state)
}

export const registerTest = (test: Test) => {
	console.log("register new test", test)
	state = state.addTest(test)
	console.log("registered test", state)
}

export const registerLogger = (id: string, logger: Function) => {
	state = state.addLogger(id, logger)
}

export const registerMetric = (id, testIds: string | Array<string>, loggerIds: string | Array<string>) => {
	
}

export const getState = (): SplitsterState => {
	return state
}