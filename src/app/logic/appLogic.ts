import { createLogic, createSideEffects, Store } from "@endreymarcell/logical"
import { deleteTaskAndFixFocus, moveFocusSafely, moveTaskWithFocus, startAddingTaskSafely } from "./logicHelpers"

export type State = {
  tasks: Array<string>
  focusedTaskIndex: number
  addingTaskAtIndex: number | null
  editingTaskAtIndex: number | null
}

const initialState: State = {
  tasks: [],
  focusedTaskIndex: 0,
  addingTaskAtIndex: null,
  editingTaskAtIndex: null,
}

export const store = new Store(initialState)

const sideEffects = createSideEffects<State>()({
  setupAutosave: [
    (intervalSeconds: number) => Promise.resolve(setInterval(() => dispatcher.saveRequested(), intervalSeconds * 1000)),
    () => () => {},
    () => () => {},
  ],
  saveState: [
    (tasks: string) => {
      window.localStorage.setItem("10Q-saved-tasks", tasks)
      return Promise.resolve()
    },
    () => () => {},
    () => () => {},
  ],
  loadState: [
    () => Promise.resolve(JSON.parse(window.localStorage.getItem("10Q-saved-tasks")) ?? []),
    (tasks: Array<string>) => (state) => void (state.tasks = tasks),
    () => () => {},
  ],
})

const logic = createLogic<State>()({
  // general
  init: () => () => sideEffects.setupAutosave(5),
  // TODO
  loadPersistedState: () => () => sideEffects.loadState(),

  // focus
  focusTaskRequested: (index: number) => (state) => void (state.focusedTaskIndex = index),
  moveFocusUpRequested: () => (state) => moveFocusSafely(state, "up"),
  moveFocusDownRequested: () => (state) => moveFocusSafely(state, "down"),

  // add
  addTaskRequested: (atIndex: number) => (state) => startAddingTaskSafely(state, atIndex),
  addTaskBeforeFocusedRequested: () => (state) => startAddingTaskSafely(state, state.focusedTaskIndex),
  addTaskAfterFocusedRequested: () => (state) => startAddingTaskSafely(state, state.focusedTaskIndex + 1),

  // edit
  editTaskClicked: (index: number) => (state) => void (state.editingTaskAtIndex = index),
  editFocusedTaskRequested: () => (state) => void (state.editingTaskAtIndex = state.focusedTaskIndex),
  editingTaskFinished: () => (state) => void (state.editingTaskAtIndex = null),
  taskTitleChanged: (index: number, newTitle: string) => (state) => void (state.tasks[index] = newTitle),

  // delete
  deleteTaskClicked: (index: number) => (state) => deleteTaskAndFixFocus(state, index),
  deleteFocusedTaskRequested: () => (state) => deleteTaskAndFixFocus(state, state.focusedTaskIndex),

  // move
  moveTaskUpRequested: (index: number) => (state) => moveTaskWithFocus(state, index, "up"),
  moveFocusedTaskUpRequested: () => (state) => moveTaskWithFocus(state, state.focusedTaskIndex, "up"),
  moveTaskDownRequested: (index: number) => (state) => moveTaskWithFocus(state, index, "down"),
  moveFocusedTaskDownRequested: () => (state) => moveTaskWithFocus(state, state.focusedTaskIndex, "down"),

  // complete
  completeRunningTaskRequested: () => (state) => {
    if (state.focusedTaskIndex === 0) {
      state.tasks.splice(0, 1)
    }
  },

  // persistance
  saveRequested: () => (state) => sideEffects.saveState(JSON.stringify(state.tasks)),
  loadCompleted: (tasks: Array<string>) => (state) => void (state.tasks = tasks),
})

export const dispatcher = store.getDispatcher()(logic, sideEffects)
