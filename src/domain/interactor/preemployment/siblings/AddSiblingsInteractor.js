export default class AddSiblingsInteractor {
	constructor (client) {
		this.client = client
	}

	execute (siblingsParam) {
		return this.client.addSiblingsForm(this.client.getToken(), siblingsParam)
	}
}
