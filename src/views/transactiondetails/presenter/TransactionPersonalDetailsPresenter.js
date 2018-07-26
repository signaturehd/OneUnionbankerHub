import { Observable } from 'rxjs'

import GetTransactionDetailsInteractor from '../../../domain/interactor/transactions/GetTransactionDetailsInteractor'
import GetTransactionPersonalInteractor from '../../../domain/interactor/transactions/GetTransactionPersonalInteractor'
import UploadTransactionImageInteractor from '../../../domain/interactor/transactions/UploadTransactionImageInteractor'
import GetTransactionParam from '../../../domain/param/GetTransactionParam'

import store from '../../../store'
import { NotifyActions } from '../../../actions/'

export default class TransactionPersonalDetailsPresenter {

  constructor (container) {
    this.getTransactionDetailsInteractor =
      new GetTransactionDetailsInteractor(container.get('HRBenefitsClient'))

    this.getTransactionPersonalInteractor =
      new GetTransactionPersonalInteractor(container.get('HRBenefitsClient'))

    this.getTransactionImage = container.get('FileClient')

    this.uploadTransactionImageInteractor =
      new UploadTransactionImageInteractor(container.get('HRBenefitsClient'))
  }

  setView (view) {
    this.view = view
  }

  getTransactionDetails (id) {
    this.view.hideCircularLoader()
    this.getTransactionDetailsInteractor.execute(GetTransactionParam(id))
    .do(resp => this.view.getTransactionDetails(resp))
      .flatMap(resp =>
        Observable.from(resp.details.Attachments)
          .flatMap(attachment =>
            this.getTransactionImage.get('v1/uploads?folder=attachments', {
              headers: {
                token: resp.token,
                file: attachment.FileName,
              },
              responseType : 'blob'
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
        this.view.showCircularLoader()
        }, e => {
          this.view.showCircularLoader()
          this.view.navigate()
      })
  }

  getTransactionsPersonal () {
    this.view.hideCircularLoader()
    this.getTransactionPersonalInteractor.execute()
      .subscribe(transactions => {
          this.view.transactions(transactions)
          this.view.hideCircularLoader()
        }, e => {
          this.view.showCircularLoader()
      })
  }

  uploadTransactionBereavement (transactionType, benefitId, image) {
    this.view.hideCircularLoader()
    this.uploadTransactionImageInteractor.execute(transactionType, benefitId, image)
      .subscribe(transactions => {
          this.view.showFileReceipt(false)
          store.dispatch(NotifyActions.addNotify({
              title : 'File Uploading',
              message : 'You\'ve successfully added your official receipt',
              type : 'success',
              duration : 2000
           })
          )
          this.view.showCircularLoader()
        }, e => {
          this.view.showCircularLoader()
      })
  }

  uploadTransactionCalamity (transactionType, benefitId, image) {
    this.view.showCircularLoader()
    this.uploadTransactionImageInteractor.execute(transactionType, benefitId, image)
      .subscribe(transactions => {
          this.view.showFileReceipt(false)
          store.dispatch(NotifyActions.addNotify({
              title : 'File Uploading',
              message : 'You\'ve successfully added your official receipt',
              type : 'success',
              duration : 2000
           })
          )
          this.view.hideCircularLoader()
        }, e => {
          this.view.hideCircularLoader()
      })
  }
}
