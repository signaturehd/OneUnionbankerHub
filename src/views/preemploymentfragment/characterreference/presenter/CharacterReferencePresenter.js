import { NotifyActions } from '../../../../actions'
import store from '../../../../store'

import GetCharacterReferenceInteractor from '../../../../domain/interactor/preemployment/characterreference/GetCharacterReferenceInteractor'
import PostCharacterReferenceInteractor from '../../../../domain/interactor/preemployment/characterreference/PostCharacterReferenceInteractor'
import PutCharacterReferenceInteractor from '../../../../domain/interactor/preemployment/characterreference/PutCharacterReferenceInteractor'

import genericParam from '../../../../domain/param/PostCharacterReferenceParam'


export default class CharacterReferencePresenter {
  constructor (container) {
    this.getCharacterReferenceInteractor = new GetCharacterReferenceInteractor(container.get('HRBenefitsClient'))
    this.postCharacterReferenceInteractor = new PostCharacterReferenceInteractor(container.get('HRBenefitsClient'))
    this.putCharacterReferenceInteractor = new PutCharacterReferenceInteractor(container.get('HRBenefitsClient'))
  }

  setView (view) {
    this.view = view
  }

  getCharacterReference () {
    this.getCharacterReferenceInteractor.execute()

    .subscribe(data => {
      this.view.showCharacterReferenceMap(data)
    }, error => {
    })
  }

  postCharacterReference (
    id,
    name,
    relationship,
    numberOfYearsKnown,
    contactNumber,
    company
  ) {
    this.postCharacterReferenceInteractor.execute(genericParam(
      id,
      name,
      relationship,
      numberOfYearsKnown,
      contactNumber,
      company
    ))
    .subscribe(data => {
      console.log(data)
    }, error => {
    })
  }

  putCharacterReference (
    id,
    name,
    relationship,
    numberOfYearsKnown,
    contactNumber,
    company
  ) {
    this.putCharacterReferenceInteractor.execute(genericParam(
      id,
      name,
      relationship,
      numberOfYearsKnown,
      contactNumber,
      company
    ))
    .subscribe(data => {
    }, error => {
    })
  }
}
