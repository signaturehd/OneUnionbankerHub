export default class GetPreEmploymentMessageInteractor {
	constructor (client) {
		this.client = client
	}

	execute () {
		return this.client.getPreEmploymentMessageStatus(this.client.getToken())
	}
}