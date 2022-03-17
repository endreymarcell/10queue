import { moveItemInArray } from "../../utils/helpers"
import type { State } from "./appLogic"

export function moveTaskWithFocus(state: State, index: number, direction: "up" | "down") {
  moveItemInArray(state.tasks, index, index + (direction === "up" ? -1 : 1))
  state.focusedTaskIndex += direction === "up" ? -1 : 1
}

export function deleteTaskAndFixFocus(state: State, index: number) {
  state.tasks.splice(index, 1)
  state.focusedTaskIndex = Math.min(state.tasks.length - 1, state.focusedTaskIndex)
}
