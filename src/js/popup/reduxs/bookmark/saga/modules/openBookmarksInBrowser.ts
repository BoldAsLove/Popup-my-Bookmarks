import * as R from 'ramda'
import {SagaIterator} from 'redux-saga'
import {all, call} from 'redux-saga/effects'
import {ActionType} from 'typesafe-actions'

import {
  createTab,
  createWindow,
  executeScript,
  getI18n,
  updateTab
} from '../../../../../common/utils'
import * as CST from '../../../../constants'
import {BookmarkInfo} from '../../../../types'
import * as bookmarkCreators from '../../actions'
import {getBookmarkInfo} from '../utils/getters'

function* getUrls(ids: Array<string>): SagaIterator {
  try {
    const bookmarkInfos: Array<BookmarkInfo> = yield all(ids.map((id) => call(getBookmarkInfo, id)))

    const filteredBookmarkInfos = bookmarkInfos.filter(
      R.both(R.propEq('isSimulated', false), R.propEq('type', CST.BOOKMARK_TYPES.BOOKMARK))
    )
    return R.pluck('url', filteredBookmarkInfos)
  } catch (err) {
    console.error(err)

    return []
  }
}

export function* openBookmarksInBrowser({
  payload
}: ActionType<typeof bookmarkCreators.openBookmarksInBrowser>): SagaIterator {
  try {
    const {ids, openBookmarkProps} = payload

    const allUrls: Array<string> = yield call(getUrls, ids)
    if (!allUrls.length) return

    const bookmarkletUrls = allUrls.filter((x) => x.startsWith('javascript:'))
    const urls = allUrls.filter((x) => !x.startsWith('javascript:'))

    if (openBookmarkProps.isAllowBookmarklet && bookmarkletUrls.length > 0) {
      // @ts-ignore: seems type is wrong, tabId is nullable
      yield call(executeScript, null, {
        code: bookmarkletUrls[0]
      })
    }

    if (urls.length > 0) {
      if (urls.length > 5) {
        const msgAskOpenAllTemplate: string = yield call(getI18n, 'askOpenAll')
        const msgAskOpenAll = msgAskOpenAllTemplate.replace('%bkmarkCount%', String(urls.length))
        // `window.confirm()` doesn't work as chrome will force close popup
        // but worked again at least since chrome 73
        // eslint-disable-next-line max-depth
        if (!window.confirm(msgAskOpenAll)) return
      }

      switch (openBookmarkProps.openIn) {
        case CST.OPEN_IN_TYPES.BACKGROUND_TAB:
          yield all(urls.map((url) => call(createTab, {url, active: false})))
          break
        case CST.OPEN_IN_TYPES.CURRENT_TAB:
          // @ts-ignore: doesn't work with overloaded function
          yield call(updateTab, {url: urls[0]})
          break
        case CST.OPEN_IN_TYPES.INCOGNITO_WINDOW:
          yield call(createWindow, {
            url: urls,
            incognito: true
          })
          break
        case CST.OPEN_IN_TYPES.NEW_TAB:
          yield all(urls.map((url) => call(createTab, {url, active: true})))
          break
        case CST.OPEN_IN_TYPES.NEW_WINDOW:
          yield call(createWindow, {url: urls})
          break
        default:
      }
    }

    if (openBookmarkProps.isCloseThisExtension) yield call(window.close)
  } catch (err) {
    console.error(err)
  }
}
