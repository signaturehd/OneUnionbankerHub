export default class AddSiblingsInteractor {
	construct (client) {
		this.client = client
	}

	execute (siblingsParam) {
		return this.client.addSiblingsForm(this.client.getToken(), siblingsParam)
	}
}
