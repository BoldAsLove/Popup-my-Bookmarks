import constate from 'constate'
import * as React from 'react'

export enum ClipboardAction {
  Copy = 'copy',
  Cut = 'cut',
  None = 'none',
}

type ClipboardState = Readonly<
  | {
      action: ClipboardAction.None
    }
  | {
      action: ClipboardAction.Copy | ClipboardAction.Cut
      items: ReadonlySet<string>
    }
>

const initialState = {
  action: ClipboardAction.None,
} as const satisfies ClipboardState

function useClipboard() {
  const [state, setState] = React.useState<ClipboardState>(initialState)

  const reset = React.useCallback(() => setState(initialState), [])

  return {
    state,
    reset,
    set: setState,
  }
}

export const [ClipboardProvider, useClipboardContext] = constate(useClipboard)
