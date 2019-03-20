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

let origin = 'https://www.oneunionbankerhub.com'
let logsStatus = null
let logUrl = null

let date = new Date()
let timeLogs = date.toDateString() +' - '+ date.toLocaleTimeString()
var config = {
  apiKey: "AIzaSyA2PFVGbSxBr3VnjA7v79OX_xaY0dmPO94",
  authDomain: "uhub-logs.firebaseapp.com",
  databaseURL: "https://uhub-logs.firebaseio.com",
  projectId: "uhub-logs",
  storageBucket: "uhub-logs.appspot.com",
  messagingSenderId: "636212495753"
};
firebase.initializeApp(config);

if(window.location.origin.toString() === origin) {
  logsStatus = 'Production Logs'
  logUrl = 'https://api.unionbankph.com/ubp/prod/'
} else {
  logsStatus = 'UAT Logs'
  logUrl = 'https://api-uat.unionbankph.com/ubp/uat/'
}

let databaseURL = firebase.database().ref();

/* Remove Data from database */
// let removeData = databaseURL.child(`${logsStatus}/code400/`)
// removeData.remove()
// 
// databaseURL.once('value', function(snap){
//     console.log(JSON.stringify(snap.val()))
// })

export default function ServiceErrorOperator (url, token, method) {
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
                "timeLogs": timeLogs,
                "status code": code,
                "message": error.message,
                "url" : logUrl+url,
                "token" : token ? token : null,
                "method" : method,
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
        } else if (code === 502) {
          let refUrl = databaseURL.child(`${logsStatus}/code502`)

          refUrl.push({
            "timeLogs": timeLogs,
            "status code": code,
            "message": error.message,
            "url" : logUrl+url,
            "token" : token ? token : null,
            "method" : method,
          })
        } else if (code === 401) {
          let refUrl = databaseURL.child(`${logsStatus}/code401`)

          refUrl.push({
            "timeLogs": timeLogs,
            "status code": code,
            "message": error.message,
            "url" : logUrl+url,
            "token" : token ? token : null,
            "method" : method,
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
            "timeLogs": timeLogs,
            "status code": code,
            "message": error.message,
            "url" : logUrl+ url,
            "token" : token ? token : null,
            "method" : method,
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
