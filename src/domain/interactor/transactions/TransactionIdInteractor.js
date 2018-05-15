export default class TransactionsIdInteractor {
    constructor (client) {
        this.client = client
    }

    execute (GetTransactionParam) {
    	console.log(GetTransactionParam)

        return this.client.getTransactionId(this.client.getToken(),GetTransactionParam)

    }
}
