import GetRewardGiftsDetailsInteractor from '../../../domain/interactor/gifts/GetRewardGiftsDetailsInteractor'

let selectedRewardsArrayList = []

export default class GiftsPresenter {
  constructor (container) {
    this.getRewardGiftsDetailsInteractor = new GetRewardGiftsDetailsInteractor(container.get('HRBenefitsClient'))
  }

  setView (view) {
    this.view = view
  }

  getRewardGiftsDetails (id) {
    this.view.circularLoader(true)
    this.getRewardGiftsDetailsInteractor.execute(id)
    .subscribe(data => {
      this.view.circularLoader(false)
      this.view.setRewardGiftsDetails(data && data)
    }, error => {
      this.view.circularLoader(false)
    })
  }

  getGiftsList (list) {
    let updateList = [...selectedRewardsArrayList]
    const id = list.id
    if(selectedRewardsArrayList.length === 0) {
      updateList.push(list)
      selectedRewardsArrayList = updateList
    } else {
      selectedRewardsArrayList.map((resp, key) => {
        if(!this.checkIdIfExist(id)) {
          updateList.push(list)
          selectedRewardsArrayList = updateList
        }
      })
    }
    this.view.setSelectedGiftList (selectedRewardsArrayList)
  }

  checkIdIfExist (id) {
    let isBool = false
    for (var i in selectedRewardsArrayList) {
      if (selectedRewardsArrayList[i].id === id) {
        isBool = true
        break
      }
    }
    return isBool
  }
}
