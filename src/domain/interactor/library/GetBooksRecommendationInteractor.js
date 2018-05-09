<<<<<<< HEAD
export default class GetBooksRecommendationInteractor {
  constructor (client) {
    this.client = client
  }

  execute () {
    return this.client.getBooksRecommendation(this.client.getToken())
  }
}
=======
export default class GetBooksRecommendationInteractor {
  constructor (client) {
    this.client = client
  }

  execute () {
    return this.client.getBooksRecommendation(this.client.getToken())
  }
}
>>>>>>> b31d5f42fccc4dd936c4027db3479da55962af7f
