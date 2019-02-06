import { Observable } from 'rxjs'

export default class GetPhenomDetailsInteractor {
  constructor (client) {
    this.client = client
  }
  execute (id) {
    return Observable.create(emitter => {
      this.client.getPhenomSelectedDiscounts(this.client.getToken(), id)
      // .flatMap(phenoms => Observable.from(phenoms))
      .catch(() =>
        Observable.of('')
      )
      .flatMap(phenom => Observable.zip(
        this.client.getPhenomImage(this.client.getToken(), phenom.rewardImage),
        this.client.getVendorImage(this.client.getToken(), phenom.rewardLogo),
        (rewardImageBlob, imageBlob) => {
          const updatedPhenom = phenom
          updatedPhenom.rewardImage = rewardImageBlob
          updatedPhenom.rewardLogo = imageBlob
          return updatedPhenom
        }))
        .subscribe(phenom => emitter.next(phenom),
         e => {
           emitter.complete(e)
         },
         e => {
          emitter.error()
        }
      )
    })
  }
}
