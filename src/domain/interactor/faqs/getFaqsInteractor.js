export default class getFaqsInteractor
{
    constructor (client) {
        this.client = client
    }

    execute () {
        return this.client.getFaqs()
    }
}