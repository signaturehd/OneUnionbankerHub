export default class FaqsInteractor {
    constructor (client) {
        this.client = client
    }

    execute () {
        return this.client.getFaqs()
    }
}