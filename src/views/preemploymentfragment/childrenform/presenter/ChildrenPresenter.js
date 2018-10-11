import GetChildrenInteractor from '../../../../domain/interactor/preemployment/children/GetChildrenInteractor'

  let bloodObjectParam = [
   {
     id : 0,
     name: 'A+'
   },
   {
     id : 1,
     name : 'A-'
   },
   {
     id : 2,
     name : 'B+'
   },
   {
     id : 3,
     name : 'B-'
   },
   {
     id : 4,
     name : '0+'
   },
   {
     id : 5,
     name : '0-'
   },
   {
     id : 6,
     name : 'AB+'
   },
   {
     id : 7,
     name : 'AB-'
   }
  ]

  let statusObject = [{
   id: 0,
   name : 'Deceased'
  }, {
   id : 1,
   name : 'Living'
  }]

  let genderObject = [{
   id : 0,
   name : 'Male'
  },{
   id: 1,
   name : 'Female'
  }]


export default class ChildrenPresenter {
  constructor (container) {
    this.getChildrenInteractor = new GetChildrenInteractor(container.get('HRBenefitsClient'))
  }

  setView (view) {
    this.view = view
  }

  /* Get Method */

  getObjectData () {
    this.view.showGender(genderObject)
    this.view.showStatus(statusObject)
    this.view.showBloodType(bloodObjectParam)
  }

  getChildren () {
    this.view.showCircularLoader()
    this.getChildrenInteractor.execute()
    .subscribe(data => {
      this.view.showChildrenDetails(data)
      this.view.hideCircularLoader()
    }, erro => {
      this.view.hideCircularLoader()
    })
  }
}
