import { NotifyActions } from '../../../../actions'
import store from '../../../../store'

import GetCharacterReferenceInteractor from '../../../../domain/interactor/preemployment/characterreference/GetCharacterReferenceInteractor'
import PostCharacterReferenceInteractor from '../../../../domain/interactor/preemployment/characterreference/PostCharacterReferenceInteractor'
import PutCharacterReferenceInteractor from '../../../../domain/interactor/preemployment/characterreference/PutCharacterReferenceInteractor'
import DeleteCharacterReferenceInteractor from '../../../../domain/interactor/preemployment/characterreference/DeleteCharacterReferenceInteractor'

import genericParam from '../../../../domain/param/PostCharacterReferenceParam'


export default class CharacterReferencePresenter {
  constructor (container) {
    this.getCharacterReferenceInteractor = new GetCharacterReferenceInteractor(container.get('HRBenefitsClient'))
    this.postCharacterReferenceInteractor = new PostCharacterReferenceInteractor(container.get('HRBenefitsClient'))
    this.putCharacterReferenceInteractor = new PutCharacterReferenceInteractor(container.get('HRBenefitsClient'))
    this.deleteCharacterReferenceInteractor = new DeleteCharacterReferenceInteractor(container.get('HRBenefitsClient'))
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

  deleteCharacterReference (id) {
    this.deleteCharacterReferenceInteractor.execute(id)
    .subscribe(data => {
      this.view.noticeResponseModal(data)
      this.getCharacterReference()
    }, error => {
    })
  }

  postCharacterReference (
    id,
    name,
    relationship,
    numberOfYearsKnown,
    contactNumber,
    company,
    address,
    occupation,
  ) {
    this.postCharacterReferenceInteractor.execute(genericParam(
      id,
      name,
      relationship,
      numberOfYearsKnown,
      contactNumber,
      company,
      address,
      occupation
    ))
    .subscribe(data => {
      this.view.noticeResponseModal(data)
      this.getCharacterReference()
    }, error => {
    })
  }

  putCharacterReference (
    id,
    name,
    relationship,
    numberOfYearsKnown,
    contactNumber,
    company,
    address,
    occupation
  ) {
    this.putCharacterReferenceInteractor.execute(genericParam(
      id,
      name,
      relationship,
      numberOfYearsKnown,
      contactNumber,
      company,
      address,
      occupation
    ))
    .subscribe(data => {
      this.view.noticeResponseModal(data)
      this.getCharacterReference()
    }, error => {
    })
  }
}
