export default class GetFaqDetailsInteractor {
    constructor (client) {
        this.client = client
    }

    execute (FaqParam) {
        return this.client.getFaqDetails(this.client.getToken(), FaqParam)
    }
}
