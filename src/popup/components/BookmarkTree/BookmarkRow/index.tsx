import classNames from 'clsx'
import * as React from 'react'

import * as CST from '../../../constants'
import { useOptions } from '../../../modules/options'
import type { BookmarkInfo } from '../../../types'
import type { ResponseEvent } from '../../dragAndDrop'
import { DragAndDropConsumer } from '../../dragAndDrop'
import classes from './bookmark-row.module.css'
import BookmarkRow from './BookmarkRow'
import useTooltip from './useTooltip'

interface Props {
  readonly bookmarkInfo: BookmarkInfo
  readonly className?: string | undefined
  readonly isDisableDragAndDrop: boolean
  readonly isHighlighted: boolean
  readonly isSearching: boolean
  readonly isShowTooltip: boolean
  readonly isUnclickable: boolean
  readonly onAuxClick: (bookmarkInfo: BookmarkInfo) => React.MouseEventHandler
  readonly onClick: (bookmarkInfo: BookmarkInfo) => React.MouseEventHandler
  readonly onDragOver: (
    bookmarkInfo: BookmarkInfo,
  ) => (evt: React.MouseEvent, responseEvent: ResponseEvent) => void
  readonly onDragStart: React.MouseEventHandler
  readonly onMouseEnter: (bookmarkInfo: BookmarkInfo) => React.MouseEventHandler
  readonly onMouseLeave: (bookmarkInfo: BookmarkInfo) => React.MouseEventHandler
  readonly style?: React.CSSProperties
}
const BookmarkRowContainer = React.forwardRef(
  function InnerBookmarkRowContainer(
    {
      bookmarkInfo,
      isHighlighted,
      onAuxClick,
      onClick,
      onDragOver,
      onMouseEnter,
      onMouseLeave,
      ...restProps
    }: Props,
    setRef: React.Ref<HTMLLIElement>,
  ) {
    const options = useOptions()

    const tooltip = useTooltip({
      isSearching: restProps.isSearching,
      isShowTooltip: restProps.isShowTooltip,
      bookmarkInfo,
    })

    const handleAuxClick = React.useMemo(
      () => onAuxClick(bookmarkInfo),
      [bookmarkInfo, onAuxClick],
    )
    const handleClick = React.useMemo(
      () => onClick(bookmarkInfo),
      [bookmarkInfo, onClick],
    )
    const handleDragOver = React.useMemo(
      () => onDragOver(bookmarkInfo),
      [bookmarkInfo, onDragOver],
    )
    const handleMouseEnter = React.useMemo(
      () => onMouseEnter(bookmarkInfo),
      [bookmarkInfo, onMouseEnter],
    )
    const handleMouseLeave = React.useMemo(
      () => onMouseLeave(bookmarkInfo),
      [bookmarkInfo, onMouseLeave],
    )

    return (
      <li
        ref={setRef}
        className={restProps.className}
        data-bookmarkid={bookmarkInfo.id}
        style={restProps.style}
      >
        <DragAndDropConsumer
          disableDrag={
            restProps.isDisableDragAndDrop ||
            bookmarkInfo.isRoot ||
            bookmarkInfo.type === CST.BOOKMARK_TYPES.NO_BOOKMARK
          }
          disableDrop={restProps.isDisableDragAndDrop}
          itemKey={bookmarkInfo.id}
          onDragOver={handleDragOver}
          onDragStart={restProps.onDragStart}
        >
          <BookmarkRow
            className={classNames({
              [classes['rootFolder'] ?? '']: bookmarkInfo.isRoot,
              [classes['dragIndicator'] ?? '']:
                bookmarkInfo.type === CST.BOOKMARK_TYPES.DRAG_INDICATOR,
              [classes['separator'] ?? '']:
                bookmarkInfo.type === CST.BOOKMARK_TYPES.SEPARATOR,
            })}
            iconSize={options.fontSize}
            iconUrl={bookmarkInfo.iconUrl}
            isHighlighted={isHighlighted}
            isUnclickable={restProps.isUnclickable}
            title={bookmarkInfo.title}
            tooltip={tooltip}
            onAuxClick={handleAuxClick}
            onClick={handleClick}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          />
        </DragAndDropConsumer>
      </li>
    )
  },
)
export default BookmarkRowContainer
