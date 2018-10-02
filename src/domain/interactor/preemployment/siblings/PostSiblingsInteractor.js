export default class PostSiblingsInteractor {
	constructor (client) {
		this.client = client
	} 

	execute (siblingsParam) {
		return this.client.postSiblings(this.client.getToken(), siblingsParam)
	}
}