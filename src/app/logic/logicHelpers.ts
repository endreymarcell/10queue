import { moveItemInArray } from "../../utils/helpers"
import type { State } from "./appLogic"

export function moveTaskWithFocus(state: State, index: number, direction: "up" | "down") {
  if ((direction === "up" && index === 0) || (direction === "down" && index === state.tasks.length - 1)) {
    return
  }
  moveItemInArray(state.tasks, index, index + (direction === "up" ? -1 : 1))
  state.focusedTaskIndex += direction === "up" ? -1 : 1
  handleDataChange(state)
}

export function deleteTaskAndFixFocus(state: State, index: number) {
  state.tasks.splice(index, 1)
  state.focusedTaskIndex = Math.min(state.tasks.length - 1, state.focusedTaskIndex)
  handleDataChange(state)
}

export function moveFocusSafely(state: State, direction: "up" | "down") {
  if (direction === "up" && state.focusedTaskIndex !== 0) {
    state.focusedTaskIndex--
  } else if (direction === "down" && state.focusedTaskIndex !== state.tasks.length - 1) {
    state.focusedTaskIndex++
  }
  handleDataChange(state)
}

export function startAddingTaskSafely(state: State, index: number) {
  if (state.tasks.length === 10) {
    return
  }

  const safeIndex = state.tasks.length === 0 ? 0 : index

  state.tasks.splice(safeIndex, 0, "")
  state.addingTaskAtIndex = safeIndex
  state.editingTaskAtIndex = safeIndex
  state.focusedTaskIndex = safeIndex
}

export function serializeState(state: State) {
  return JSON.stringify(state.tasks)
}

export function handleDataChange(state: State) {
  const serializedCurrentState = JSON.stringify(state.tasks)
  state.hasUnsavedChanged = state.latestSavedState !== serializedCurrentState
}
