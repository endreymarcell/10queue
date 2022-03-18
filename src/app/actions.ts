export function focusOnMount(node: HTMLElement) {
  node.focus()
}

export function setInputValueOnMount(node: HTMLInputElement, value: string) {
  node.value = value
}

export function onTextInputFinish(node: HTMLInputElement, onFinish: (newValue: string) => void) {
  const onKeyDown = (event: KeyboardEvent) => {
    if (event.key === "Enter") {
      event.stopPropagation()
      onFinish(node.value)
    }
  }
  const onBlur = () => onFinish(node.value)

  node.addEventListener("keydown", onKeyDown)
  node.addEventListener("blur", onBlur)

  return {
    destroy: () => {
      node.removeEventListener("keydown", onKeyDown)
      node.removeEventListener("blur", onBlur)
    },
  }
}

export function onTextInputCancel(node: HTMLInputElement, onCancel: () => void) {
  const onKeyDown = (event: KeyboardEvent) => {
    if (event.key === "Escape") {
      onCancel()
    }
  }
  node.addEventListener("keydown", onKeyDown)
  return {
    destroy: () => {
      node.removeEventListener("keydown", onKeyDown)
    },
  }
}

type Callback = () => void

export function keyboardShortcuts(
  _: HTMLElement,
  params: {
    shortcuts: Map<string, Callback>
    getEnabledStatus?: () => boolean
  }
) {
  const { shortcuts, getEnabledStatus } = params
  const onKeyDown = (event: KeyboardEvent) => {
    if (getEnabledStatus != null && !getEnabledStatus()) {
      return
    } else if (shortcuts.has(event.key)) {
      event.preventDefault()
      const callback = shortcuts.get(event.key)
      if (callback !== undefined) {
        callback()
      }
    }
  }
  window.addEventListener("keydown", onKeyDown)
  return {
    destroy: () => window.removeEventListener("keydown", onKeyDown),
  }
}
