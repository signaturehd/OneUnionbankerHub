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
import firebase from "firebase";
import moment from 'moment'

let origin = 'https://www.oneunionbankerhub.com'
let logsStatus = null

let config = {
  apiKey: "AIzaSyA2PFVGbSxBr3VnjA7v79OX_xaY0dmPO94",
  authDomain: "uhub-logs.firebaseapp.com",
  databaseURL: "https://uhub-logs.firebaseio.com",
  projectId: "uhub-logs",
  storageBucket: "",
  messagingSenderId: "636212495753"
};
firebase.initializeApp(config);

if(window.location.origin.toString() === origin) {
  logsStatus = 'Production Logs'
} else {
  logsStatus = 'UAT Logs'
}

let databaseURL = firebase.database().ref();

export default function ServiceErrorOperator () {
  return function ServiceErrorOperatorImpl (source) {
    return Observable.create(subscriber => {
      const subscription = source.subscribe(data => {
        const code = data.status
        const body = data.data
        if (code === 200) {
          subscriber.next(body)
        } else if (code === 400) {
          let refUrl = databaseURL.child(`${logsStatus}/code400`)
          if (Array.isArray(body.errors)) {
            body.errors.map((error, key) => {
              refUrl.push({
                "timeLogs": moment().format('dddd, MMMM DD, YYYY, h:MM:ss A'),
                "status code": code,
                "message": error.message,
              })
              store.dispatch(NotifyActions.addNotify({
                  title : 'One UnionBanker Hub',
                  message : error.message,
                  type : 'warning',
                  duration : 6000
                })
              )
            })
          }
          subscriber.error(new GenericError(body))
        } else if (code === 401) {
          let refUrl = databaseURL.child(`${logsStatus}/code401`)

          refUrl.push({
            "timeLogs": moment().format('dddd, MMMM DD, YYYY, h:MM:ss A'),
            "status code": code,
            "message": body,
          })

          store.dispatch(LoginActions.showReloginModal(true))
          subscriber.error(new ForbiddenError())
        } else {
          store.dispatch(NotifyActions.addNotify({
              title : 'One UnionBanker Hub',
              message : 'It seems that we\'ve encountered a problem.',
              type : 'danger',
              duration : 6000
            })
          )
          let refUrl = databaseURL.child(`${logsStatus}/code000`)

          refUrl.push({
            "timeLogs": moment().format('dddd, MMMM DD, YYYY, h:MM:ss A'),
            "status code": code,
            "message": body,
          })
          subscriber.error(new ServerError('It seems that we\'ve encountered a problem. Error: 1'))
        }
      },
      err => subscriber.error(new ServerError('It seems that \'ve encountered a problem. Error: 2')),
      () => subscriber.complete())

      return subscription
   })
  }
}
