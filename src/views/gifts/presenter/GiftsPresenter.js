import GetRewardGiftsDetailsInteractor from '../../../domain/interactor/gifts/GetRewardGiftsDetailsInteractor'
import GetRewardGiftsInteractor from '../../../domain/interactor/gifts/GetRewardGiftsInteractor'

let categoryList = []
export default class GiftsPresenter {
  constructor (container) {
    this.getRewardGiftsDetailsInteractor = new GetRewardGiftsDetailsInteractor(container.get('HRBenefitsClient'))
    this.getRewardGiftsInteractor = new GetRewardGiftsInteractor(container.get('HRBenefitsClient'))
  }

  setView (view) {
    this.view = view
  }

  setCategoryType (category) {
    category && category.map((data, key) => {
      let setCategory = [...categoryList]
      if(!this.checkIdIfExist(data.category.toLowerCase())) {
        setCategory.push(data.category.toLowerCase())
        categoryList = setCategory
      }
    })
    console.log(categoryList)
  }

  checkIdIfExist (id) {
    let isBool = false
    for (var i in categoryList) {
      if (categoryList[i] === id) {
        isBool = true
        break
      }
    }
    return isBool
  }

  getRewardGifts () {
    this.getRewardGiftsInteractor.execute()
    .subscribe(data => {
      this.view.setRewardGifts(data)
      this.setCategoryType(data)
    }, error => {

    })
  }

}
