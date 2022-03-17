import { createLogic, Store } from "@endreymarcell/logical"
import { deleteTaskAndFixFocus, moveTaskWithFocus } from "./logicHelpers"

export type State = {
  tasks: Array<string>
  focusedTaskIndex: number
  isAddingTask: boolean
  isEditing: boolean
}

const initialState: State = {
  tasks: ["foo", "bar", "baz"],
  focusedTaskIndex: 0,
  isAddingTask: false,
  isEditing: false,
}

export const store = new Store(initialState)

const logic = createLogic<State>()({
  // focus
  focusTaskRequested: (index: number) => (state) => void (state.focusedTaskIndex = index),
  moveFocusUpRequested: () => (state) => void (state.focusedTaskIndex = Math.max(0, state.focusedTaskIndex - 1)),
  moveFocusDownRequested: () => (state) =>
    void (state.focusedTaskIndex = Math.min(state.tasks.length - 1, state.focusedTaskIndex + 1)),

  // add
  addTaskRequested: () => (state) => void (state.isAddingTask = true),

  // edit
  editTaskClicked: (index: number) => (state) => void (state.isEditing = true),
  editFocusedTaskRequested: () => (state) => void (state.isEditing = true),
  taskTitleChanged: (index: number, newTitle: string) => (state) => void (state.tasks[index] = newTitle),

  // delete
  deleteTaskClicked: (index: number) => (state) => deleteTaskAndFixFocus(state, index),
  deleteFocusedTaskRequested: () => (state) => deleteTaskAndFixFocus(state, state.focusedTaskIndex),

  // move
  moveTaskUpRequested: (index: number) => (state) => moveTaskWithFocus(state, index, "up"),
  moveFocusedTaskUpRequested: () => (state) => moveTaskWithFocus(state, state.focusedTaskIndex, "up"),
  moveTaskDownRequested: (index: number) => (state) => moveTaskWithFocus(state, index, "down"),
  moveFocusedTaskDownRequested: () => (state) => moveTaskWithFocus(state, state.focusedTaskIndex, "down"),
})

export const dispatcher = store.getDispatcher()(logic)
