import * as CST from '../../../constants'
import folderIcon from '../../../images/folder.svg'
import type { BookmarkInfo } from '../../../types'

const getIconUrl = (bookmarkInfo: BookmarkInfo): string => {
  if (bookmarkInfo.type === CST.BOOKMARK_TYPES.BOOKMARK)
    return `chrome://favicon/${bookmarkInfo.url}`
  if (bookmarkInfo.type === CST.BOOKMARK_TYPES.FOLDER) return folderIcon
  return ''
}

const getType = (
  bookmarkNode: browser.bookmarks.BookmarkTreeNode,
): CST.BOOKMARK_TYPES => {
  if (bookmarkNode.url == null) return CST.BOOKMARK_TYPES.FOLDER
  if (bookmarkNode.url.startsWith(CST.SEPARATE_THIS_URL))
    return CST.BOOKMARK_TYPES.SEPARATOR
  return CST.BOOKMARK_TYPES.BOOKMARK
}

const isRoot = (bookmarkNode: browser.bookmarks.BookmarkTreeNode): boolean =>
  bookmarkNode.id === CST.ROOT_ID || bookmarkNode.parentId === CST.ROOT_ID

export const toBookmarkInfo = (
  bookmarkNode: browser.bookmarks.BookmarkTreeNode,
): BookmarkInfo => {
  const bookmarkInfo = {
    iconUrl: '',
    id: bookmarkNode.id,
    isRoot: isRoot(bookmarkNode),
    isSimulated: false,
    isUnmodifiable: isRoot(bookmarkNode) || Boolean(bookmarkNode.unmodifiable),
    parentId: bookmarkNode.parentId ?? '',
    storageIndex:
      typeof bookmarkNode.index === 'number' ? bookmarkNode.index : -1,
    title: bookmarkNode.title,
    type: getType(bookmarkNode),
    url: bookmarkNode.url ?? '',
  }

  return {
    ...bookmarkInfo,
    iconUrl: getIconUrl(bookmarkInfo),
  }
}
