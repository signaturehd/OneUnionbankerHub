export default class GetSiblingsInteractor {
	constructor (client) {
		this.client = client
	} 

	execute () {
		return this.client.getSiblings(this.client.getToken())
	}
}