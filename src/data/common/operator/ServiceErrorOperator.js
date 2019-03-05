import GenericError from '../../../domain/common/exception/GenericError'
import ForbiddenError from '../../../domain/common/exception/ForbiddenError'
import ServerError from '../../../domain/common/exception/ServerError'
import { Observable } from 'rxjs'
import {
  Modal
} from '../../../ub-components'

import SessionProvider from '../../provider/SessionProvider'

import store from '../../../store'
import { NotifyActions, LoginActions } from '../../../actions'

export default function ServiceErrorOperator () {
  return function ServiceErrorOperatorImpl (source) {
    return Observable.create(subscriber => {
      const subscription = source.subscribe(data => {
        const code = data.status
        const body = data.data
        if (code === 200) {
          subscriber.next(body)
        } else if (code === 400) {
          if (Array.isArray(body.errors)) {
            body.errors.map((error, key) => (
              store.dispatch(NotifyActions.addNotify({
                  title : 'One UnionBanker Hub',
                  message : error.message,
                  type : 'warning',
                  duration : 2000
                })
              )
            ))
          }
          subscriber.error(new GenericError(body))
        } else if (code === 401) {
          store.dispatch(LoginActions.showReloginModal(true))
          subscriber.error(new ForbiddenError())
        } else {
          store.dispatch(NotifyActions.addNotify({
              title : 'One UnionBanker Hub',
              message : 'It seems that we\'ve encountered a problem.',
              type : 'danger',
              duration : 2000
            })
          )
          subscriber.error(new ServerError('It seems that we\'ve encountered a problem. Error: 1'))
        }
      },
      err => subscriber.error(new ServerError('It seems that \'ve encountered a problem. Error: 2')),
      () => subscriber.complete())

      return subscription
   })
  }
}
