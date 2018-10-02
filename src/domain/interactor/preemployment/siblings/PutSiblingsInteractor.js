export default class PutSiblingsInteractor {
	construct (client) {
		this.client = client 
	}

	execute (siblingsParam) {
		return this.client.putSiblings(this.client.getToken(), siblingsParam)
	} 
}