import { Observable } from 'rxjs'

import GetTransactionDetailsInteractor from '../../../domain/interactor/transactions/GetTransactionDetailsInteractor'
import GetTransactionPersonalInteractor from '../../../domain/interactor/transactions/GetTransactionPersonalInteractor'

import GetTransactionParam from '../../../domain/param/GetTransactionParam'

export default class TransactionPersonalDetailsPresenter {
  constructor (container) {
    this.getTransactionDetailsInteractor =
      new GetTransactionDetailsInteractor(container.get('HRBenefitsClient'))

    this.getTransactionPersonalInteractor =
      new GetTransactionPersonalInteractor(container.get('HRBenefitsClient'))

    this.getTransactionImage = container.get('ImageClient')
  }
  setView (view) {
    this.view = view
  }

  getTransactionDetails (id) {
    this.getTransactionDetailsInteractor.execute(GetTransactionParam(id))
      .do(resp => this.view.getTransactionDetails(resp))
      .flatMap(resp =>
        Observable.from(resp.details.Attachments)
          .flatMap(attachment =>
            this.getTransactionImage.get('v1/uploads?folder=attachments', {
              headers: {
                token: resp.token,
                file: attachment.FileName,
              }
            }))
          .flatMap(resp =>
            Observable.create(observer => {
              const reader = new FileReader()

              reader.onerror = err => observer.error(err)
              reader.onabort = err => observer.error(err)
              reader.onload = () => observer.next(reader.result)
              reader.onloadend = () => observer.complete()

              reader.readAsDataURL(resp.data)
            })
          )
          .toArray()
      )
      .subscribe(attachments => {
        this.view.showAttachments(attachments)
        }, e => {
          this.view.hideLoading()
      })
  }

  getTransactionsPersonal () {
    this.getTransactionPersonalInteractor.execute()
      .subscribe(transactions => {
          this.view.transactions(transactions)
        }, e => {
          this.view.hideLoading()
      })
  }
}
