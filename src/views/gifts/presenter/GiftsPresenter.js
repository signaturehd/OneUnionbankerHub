import GetRewardGiftsInteractor from '../../../domain/interactor/gifts/GetRewardGiftsInteractor'

let categoryList = []
export default class GiftsPresenter {
  constructor (container) {
    this.getRewardGiftsInteractor = new GetRewardGiftsInteractor(container.get('HRBenefitsClient'))
  }

  setView (view) {
    this.view = view
  }

  setCategoryType (category) {
    category && category.map((data, key) => {
      let setCategory = [...categoryList]
      if(!this.checkIdIfExist(data.category.toLowerCase())) {
        setCategory.push(data.category)
        categoryList = setCategory
      }
    })
    this.view.setCategoryTypeList(categoryList)
  }

  checkIdIfExist (id) {
    let isBool = false
    for (var i in categoryList) {
      if (categoryList[i].toLowerCase() === id) {
        isBool = true
        break
      }
    }
    return isBool
  }

  getRewardGifts () {
    this.view.circularLoader(true)
    this.getRewardGiftsInteractor.execute()
    .subscribe(data => {
      this.view.circularLoader(false)
      this.view.setRewardGifts(data)
      this.setCategoryType(data)
    }, error => {
      this.view.circularLoader(false)
    })
  }
}
