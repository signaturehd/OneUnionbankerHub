
import GetEmployeeTrainingInteractor from
'../../../domain/interactor/training/GetEmployeeTrainingInteractor'

import GetEmployeeTrainingDetailsInteractor from
'../../../domain/interactor/training/GetEmployeeTrainingDetailsInteractor'

import EnrollEmployeeInteractor from
'../../../domain/interactor/training/EnrollEmployeeInteractor'

import EnrolledTrainingInteractor from
'../../../domain/interactor/training/EnrolledTrainingInteractor'

import ApprovalTrainingInteractor from
'../../../domain/interactor/training/ApprovalTrainingInteractor'

import ApprovedTrainingInteractor from
'../../../domain/interactor/training/ApprovedTrainingInteractor'

import ApprovalTrainingDetailsInteractor from
'../../../domain/interactor/training/ApprovalTrainingDetailsInteractor'

import ApprovalTrainingRequestInteractor from
'../../../domain/interactor/training/ApprovalTrainingRequestInteractor'

import ApprovalTrainingParam from '../../../domain/param/ApprovalTrainingParam'

import moment from 'moment'

export default class MyTrainingPresenter {
  constructor (container) {
    this.getEmployeeTrainingInteractor =
      new GetEmployeeTrainingInteractor(container.get('HRBenefitsClient'))

    this.getEmployeeTrainingDetailsInteractor =
      new GetEmployeeTrainingDetailsInteractor(container.get('HRBenefitsClient'))

    this.enrollEmployeeInteractor =
      new EnrollEmployeeInteractor(container.get('HRBenefitsClient'))

    this.getEnrolledTrainingInteractor =
      new EnrolledTrainingInteractor(container.get('HRBenefitsClient'))

    this.approvalTrainingInteractor =
      new ApprovalTrainingInteractor(container.get('HRBenefitsClient'))

    this.approvedTrainingInteractor =
      new ApprovedTrainingInteractor(container.get('HRBenefitsClient'))

    this.approvalTrainingDetailsInteractor =
      new ApprovalTrainingDetailsInteractor(container.get('HRBenefitsClient'))

    this.approvalTrainingRequestInteractor =
      new ApprovalTrainingRequestInteractor(container.get('HRBenefitsClient'))

  }

  setView (view) {
    this.view = view
  }

  getEmployeeTraining () {
    this.view.showCircularLoader(true)
    this.getEmployeeTrainingInteractor.execute()
    .subscribe(data => {
      this.view.hideCircularLoader(false)
      this.view.showTrainingList(data)
    }, error => {
      this.view.navigate()
    })
  }

  getNeedApprovalTrainings () {
    this.view.circularLoader(true)
    this.approvalTrainingInteractor.execute()
    .subscribe(data => {
      this.view.circularLoader(false)
      this.view.showApprovalList(data)
    }, error => {
      this.view.navigate()
    })
  }

  getApprovedTrainings () {
    this.view.circularLoader(true)
    this.approvedTrainingInteractor.execute()
    .subscribe(data => {
      this.view.circularLoader(false)
      this.view.showApprovedList(data)
    }, error => {
      this.view.navigate()
    })
  }

  getEnrolledTraining () {
    this.view.circularLoader(true)
    this.getEnrolledTrainingInteractor.execute()
    .subscribe(data => {
      this.view.circularLoader(false)
      this.view.setEnrolledTrainingList(data)
    }, error => {
      this.view.navigate()
    })
  }

  getEmployeeTrainingDetails (id) {
    this.view.setLoadingModal(true)
    this.getEmployeeTrainingDetailsInteractor.execute(id)
    .subscribe(data => {
      this.view.setLoadingModal(false)
      this.view.setTrainingDetails(data)
    }, error => {
      this.view.setLoadingModal(false)
    })
  }

  enrollEmployee (id) {
    this.enrollEmployeeInteractor.execute(id)
    .subscribe(data => {
      this.view.noticeResponse(data)
    }, error => {
      this.view.clearTraining()
    })
  }

  getApprovalTrainingDetails (id) {
    this.view.modalLoader(true)
    this.approvalTrainingDetailsInteractor.execute(id)
    .subscribe(data => {
      this.view.modalLoader(false)
      this.view.setApprovalTrainingDetails(data)
    }, error => {
      this.view.modalLoader(false)
    })
  }

  trainingRequest (
    trainingId,
    employeeId,
    status,
    rejectionReason
  ) {
    this.approvalTrainingRequestInteractor.execute(trainingId, ApprovalTrainingParam(employeeId, status, rejectionReason))
    .subscribe(data => {
      console.log(data);
    }, error => {
      console.log(error);
    })
  }
}
