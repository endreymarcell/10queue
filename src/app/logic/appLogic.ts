import { createLogic, Store } from "@endreymarcell/logical"

type State = {
  tasks: Array<string>
}

const initialState: State = {
  tasks: ["foo", "bar", "baz"],
}

export const store = new Store(initialState)

const logic = createLogic<State>()({
  addTask: () => (state) => void state.tasks.push("woo"),
})

export const dispatcher = store.getDispatcher()(logic)
