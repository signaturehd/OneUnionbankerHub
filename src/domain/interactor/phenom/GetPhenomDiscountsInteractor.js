import { Observable } from 'rxjs'

export default class GetPhenomDiscountsInteractor {
  constructor (client) {
    this.client = client
  }

  execute () {
    return Observable.create(emitter => {
      this.client.getPhenomDiscounts(this.client.getToken())
        .flatMap(phenoms => Observable.from(phenoms))
        .flatMap(phenom => Observable.zip(
          this.client.getPhenomImage(this.client.getToken(), phenom.rewardImage),
          this.client.getVendorImage(this.client.getToken(), phenom.vendor.image),
          (rewardImageBlob, imageBlob) => {
            const updatedPhenom = phenom
            updatedPhenom.rewardImageBlob = rewardImageBlob
            updatedPhenom.vendor.imageBlob = imageBlob
            return updatedPhenom
          }))
        .subscribe(phenom => {
          emitter.next(phenom)
        },
         e => emitter.error(e),
        () => emitter.complete())
    })
  }
}
