import GenericError from '../../../domain/common/exception/GenericError'
import ForbiddenError from '../../../domain/common/exception/ForbiddenError'
import ServerError from '../../../domain/common/exception/ServerError'
import { Observable } from 'rxjs'

import SessionProvider from '../../provider/SessionProvider'

export default function ServiceErrorOperator () {
  return function ServiceErrorOperatorImpl (source) {
    return Observable.create(subscriber => {
      const subscription = source.subscribe(data => {
        const code = data.status
        const body = data.data
        if (code === 200) {
          subscriber.next(body)
        } else if (code === 400) {
          subscriber.error(new GenericError(body))
        } else if (code === 401) {
          subscriber.error(new ForbiddenError())
          new SessionProvider().setToken('')
          new SessionProvider().setAccountToken('')
        } else {
          subscriber.error(new ServerError('It seems that we\'ve encountered a problem. Error: 1'))
        }
      },
      err => subscriber.error(new ServerError('It seems that \'ve encountered a problem. Error: 2')),
      () => subscriber.complete());

      return subscription
   })
  }
}
