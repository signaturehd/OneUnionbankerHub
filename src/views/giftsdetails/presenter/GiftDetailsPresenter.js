import GetRewardGiftsDetailsInteractor from '../../../domain/interactor/gifts/GetRewardGiftsDetailsInteractor'
import GetRewardPointsInteractor from '../../../domain/interactor/rewards/GetRewardPointsInteractor'
import AddRewardGiftsDenominationsInteractor from '../../../domain/interactor/rewards/AddRewardGiftsDenominationsInteractor'
import moment from 'moment'
let selectedRewardsArrayList = []
let totalPoints = 0

export default class GiftsPresenter {
  constructor (container) {
    this.getRewardGiftsDetailsInteractor = new GetRewardGiftsDetailsInteractor(container.get('HRBenefitsClient'))
    this.addRewardGiftsDenominationsInteractor = new AddRewardGiftsDenominationsInteractor(container.get('HRBenefitsClient'))
    this.getRewardPointsInteractor = new GetRewardPointsInteractor(container.get('HRBenefitsClient'))
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

  setRewardPoints (data) {
    totalPoints = data
    this.view.setRewardPoints(data)
  }

  resetRewardList () {
    selectedRewardsArrayList = []
    this.view.setSelectedGiftList(selectedRewardsArrayList)
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

  getRewardPoints () {
    this.getRewardPointsInteractor.execute()
    .subscribe(data => {
      this.view.setRewardPoints(data.points)
    }, error => {

    })
  }

  setDeleteSelectedGifts (id, key) {
    try {
      const updateArrayList = [...selectedRewardsArrayList]
      selectedRewardsArrayList && selectedRewardsArrayList.map((resp, idx) => {
        if(resp.id === id) {
          updateArrayList.splice(idx, 1)
        }
      })
      selectedRewardsArrayList = updateArrayList

      this.view.setSelectedGiftList (selectedRewardsArrayList)
    } catch (e) {
      console.log(e)
    }
  }

  addRewardGiftsDenominations (mode, id) {
    this.view.circularLoader(true)
    const now = new Date().getTime();
    const timeNow = moment(now).toDate();

    let newArrayList = []
    if (mode === 1) {
      selectedRewardsArrayList && selectedRewardsArrayList.map((resp, key) => {
        let updateArray = [...newArrayList]
        updateArray.push({
          "merchantId": resp.id,
          "points": resp.value,
          "quantity": resp.qty,
        })
        newArrayList = updateArray
      })

      const objectParam = {
        items: newArrayList,
        tags: timeNow,
      }
      this.addRewardGiftsDenominationsInteractor.execute(objectParam, mode)
      .subscribe(data => {
        this.resetRewardList()
        this.view.noticeResponse(data)
        this.view.circularLoader(false)
      }, error => {
        this.view.circularLoader(false)
      })
    } else if (mode === 2) {
      selectedRewardsArrayList && selectedRewardsArrayList.map((resp, key) => {
        let updateArray = [...newArrayList]
        updateArray.push({
          "denominationId": resp.id,
          "value": resp.value,
          "points": resp.value * resp.qty * 20,
          "quantity": parseInt(resp.qty),
        })
        newArrayList = updateArray
      })

      const objectParam = {
        "items": newArrayList,
        "tags": timeNow,
      }
      this.addRewardGiftsDenominationsInteractor.execute(objectParam, mode)
      .subscribe(data => {
        this.view.noticeResponse(data)
        this.resetRewardList()
        this.view.circularLoader(false)
      }, error => {
        this.view.circularLoader(false)
      })
    }
  }
}
