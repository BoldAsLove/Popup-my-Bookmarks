import classNames from 'clsx'
import * as React from 'react'

import { useKeyBindingsContext } from './KeyBindingsContext'
import classes from './KeyBindingsWindow.css'

type Props = React.HTMLAttributes<Element> & {
  windowId: string
}
const KeyBindingsWindow = ({
  children,
  className,
  onFocus,
  windowId,
  ...props
}: Props) => {
  const { appendActiveWindowId, removeActiveWindowId } = useKeyBindingsContext()

  React.useEffect(() => {
    appendActiveWindowId(windowId)

    return () => {
      removeActiveWindowId(windowId)
    }
  }, [appendActiveWindowId, removeActiveWindowId, windowId])

  const handleFocus = React.useCallback<React.FocusEventHandler>(
    (evt) => {
      evt.stopPropagation()

      if (onFocus) onFocus(evt)

      appendActiveWindowId(windowId)
    },
    [onFocus, appendActiveWindowId, windowId],
  )

  const windowRef = React.useRef<HTMLDivElement>(null)
  React.useEffect(() => {
    if (windowRef.current) windowRef.current.focus()
  }, [])

  return (
    <div
      ref={windowRef}
      tabIndex={-1}
      {...props}
      className={classNames(classes.wrapper, className)}
      onFocus={handleFocus}
    >
      {children}
    </div>
  )
}

export default KeyBindingsWindow
