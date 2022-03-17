export function focusOnMount(node: HTMLElement) {
  node.focus()
}

export function setInputValueOnMount(node: HTMLInputElement, value: string) {
  node.value = value
}

export function onTextInputFinish(node: HTMLInputElement, onFinish: (newValue: string) => void) {
  const onKeyDown = (event) => {
    if (event.key === "Enter") {
      onFinish(node.value)
    }
  }
  node.addEventListener("keydown", onKeyDown)
  return {
    destroy: () => node.removeEventListener("keydown", onKeyDown),
  }
}

export function onTextInputCancel(node: HTMLInputElement, onCancel: () => void) {
  const onKeyDown = (event) => {
    if (event.key === "Escape") {
      onCancel()
    }
  }
  const onBlur = () => onCancel()
  node.addEventListener("keydown", onKeyDown)
  node.addEventListener("blur", onBlur)
  return {
    destroy: () => {
      node.removeEventListener("keydown", onKeyDown)
      node.removeEventListener("blur", onBlur)
    },
  }
}
