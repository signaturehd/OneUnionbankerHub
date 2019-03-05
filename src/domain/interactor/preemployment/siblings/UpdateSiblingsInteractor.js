export default class UpdateSiblingsInteractor {
	constructor (client) {
		this.client = client
	}

	execute (siblingsParam) {
		return this.client.updateSiblingsForm(this.client.getToken(), siblingsParam)
	}
}
