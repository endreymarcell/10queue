import { createLogic, createSideEffects, Store, noop } from "@endreymarcell/logical"
import { LOCAL_STORAGE_KEY } from "../../utils/const"
import {
  beforeUnloadListener,
  deleteTaskAndFixFocus,
  handleDataChange,
  moveFocusSafely,
  moveTaskWithFocus,
  serializeState,
  startAddingTaskSafely,
} from "./logicHelpers"

export type State = {
  tasks: Array<string>
  focusedTaskIndex: number
  addingTaskAtIndex: number | null
  editingTaskAtIndex: number | null
  latestSavedState: string
  hasUnsavedChanges: boolean
}

const initialState: State = {
  tasks: [],
  focusedTaskIndex: 0,
  addingTaskAtIndex: null,
  editingTaskAtIndex: null,
  latestSavedState: "",
  hasUnsavedChanges: false,
}

export const store = new Store(initialState)

// TODO https://github.com/endreymarcell/logical/issues/2
// @ts-ignore
export const sideEffects = createSideEffects<State>()({
  setupAutosave: [
    (intervalSeconds: number) => Promise.resolve(setInterval(() => dispatcher.saveRequested(), intervalSeconds * 1000)),
    noop,
    noop,
  ],
  saveState: [
    (serializedState: string) => {
      window.localStorage.setItem(LOCAL_STORAGE_KEY, serializedState)
      return Promise.resolve(serializedState)
    },
    (serializedState: string) => (state) => {
      state.latestSavedState = serializedState
      state.hasUnsavedChanges = false
      console.log("Marca has finished saving")
      dispatcher.checkSavedState(state)
    },
    noop,
  ],
  loadState: [
    () => {
      const savedTasks = window.localStorage.getItem(LOCAL_STORAGE_KEY)
      return Promise.resolve(savedTasks !== null ? savedTasks : "")
    },
    (tasks: string) => (state) => {
      state.tasks = JSON.parse(tasks)
    },
    noop,
  ],
  addDataLossWarning: [
    () => {
      console.log("Marca: adding")
      window.addEventListener("beforeunload", beforeUnloadListener)
      return Promise.resolve()
    },
    noop,
    noop,
  ],
  removeDataLossWarning: [
    () => {
      console.log("Marca: removing")
      window.removeEventListener("beforeunload", beforeUnloadListener)
      return Promise.resolve()
    },
    noop,
    noop,
  ],
})

// TODO https://github.com/endreymarcell/logical/issues/2
// @ts-ignore
const logic = createLogic<State>()({
  // general
  init: () => () => [sideEffects.loadState(), sideEffects.setupAutosave(5)],

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
  editingTaskEnded: (currentTitle: string) => (state) => {
    if (state.editingTaskAtIndex === null) {
      // should not be possible but oh well
      return
    } else if (state.addingTaskAtIndex === state.editingTaskAtIndex) {
      // cancelled addition
      const newTaskIndex = state.addingTaskAtIndex
      state.addingTaskAtIndex = null
      state.editingTaskAtIndex = null
      return deleteTaskAndFixFocus(state, newTaskIndex)
    } else {
      // valid new title
      const adjustedNewTitle = currentTitle.trim()
      if (adjustedNewTitle !== "") {
        state.tasks[state.editingTaskAtIndex] = adjustedNewTitle
        state.editingTaskAtIndex = null
        return handleDataChange(state)
      }
    }
  },
  taskTitleChanged: (index: number, newTitle: string) => (state) => {
    state.tasks[index] = newTitle
  },

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
  saveRequested: () => (state) => state.hasUnsavedChanges ? sideEffects.saveState(serializeState(state)) : null,
  loadCompleted: (tasks: Array<string>) => (state) => void (state.tasks = tasks),
  // TODO huh, ouch
  checkSavedState: (state) => () =>
    state.hasUnsavedChanges ? sideEffects.addDataLossWarning() : sideEffects.removeDataLossWarning(),
})

// TODO https://github.com/endreymarcell/logical/issues/2
// @ts-ignore
export const dispatcher = store.getDispatcher()(logic, sideEffects)
