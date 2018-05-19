import GenericError from '../../../domain/common/exception/GenericError'
import ForbiddenError from '../../../domain/common/exception/ForbiddenError'
import ServerError from '../../../domain/common/exception/ServerError'
import { Observable } from 'rxjs'

import SessionProvider from '../../provider/SessionProvider'

import store from '../../../store'
import { NotifyActions } from '../../../actions'

export default function ServiceErrorOperator () {
  return function ServiceErrorOperatorImpl (source) {
    return Observable.create(subscriber => {
      const subscription = source.subscribe(data => {
        const code = data.status
        const body = data.data
        if (code === 200) {
          subscriber.next(body)
        } else if (code === 400) {
          body.errors.map((error, key) => (
            store.dispatch(NotifyActions.addNotify({
                title : 'My Benefits',
                message : error.message,
                type : 'danger',
                duration : 2000
              })
            )
          ))
          subscriber.error(new GenericError(body))
        } else if (code === 401) {
          store.dispatch(NotifyActions.addNotify({
              title : 'Unauthorize',
              message : 'Please re log in',
              type : 'danger',
              duration : 2000
            })
          )
          subscriber.error(new ForbiddenError())
        } else {
          console.log(body)
          store.dispatch(NotifyActions.addNotify({
              title : 'Server Error',
              message : 'There is a problem with the server',
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
