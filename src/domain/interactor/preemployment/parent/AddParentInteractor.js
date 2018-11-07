export default class AddParentInteractor {
	constructor (client) {
		this.client = client
	}

	execute (parentsParam) {
		return this.client.addParentForm(this.client.getToken(), parentsParam)
	}
}
