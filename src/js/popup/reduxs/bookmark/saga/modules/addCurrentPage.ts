import {SagaIterator} from 'redux-saga'
import {call, put} from 'redux-saga/effects'
import {ActionType} from 'typesafe-actions'
import webExtension from 'webextension-polyfill'

import {queryTabs} from '../../../../../common/utils'
import * as bookmarkCreators from '../../actions'

export function* addCurrentPage({
  payload
}: ActionType<typeof bookmarkCreators.addCurrentPage>): SagaIterator {
  const [currentTab]: Array<webExtension.tabs.Tab> = yield call(queryTabs, {
    currentWindow: true,
    active: true
  })

  yield put(
    bookmarkCreators.createBookmark(
      payload.parentId,
      payload.index,
      currentTab.title || '',
      currentTab.url || ''
    )
  )
}
