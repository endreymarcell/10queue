import { dispatcher } from "../../logic/appLogic"

export const shortcutMap = new Map(
  Object.entries({
    j: () => dispatcher.moveFocusDownRequested(),
    k: () => dispatcher.moveFocusUpRequested(),
    d: () => dispatcher.deleteFocusedTaskRequested(),
    Backspace: () => dispatcher.deleteFocusedTaskRequested(),
    Enter: () => dispatcher.completeRunningTaskRequested(),
    e: () => dispatcher.editFocusedTaskRequested(),
    c: () => dispatcher.editFocusedTaskRequested(),
    J: () => dispatcher.moveFocusedTaskDownRequested(),
    K: () => dispatcher.moveFocusedTaskUpRequested(),
    o: () => dispatcher.addTaskAfterFocusedRequested(),
    O: () => dispatcher.addTaskBeforeFocusedRequested(),
    s: () => dispatcher.saveRequested(),
  })
)
