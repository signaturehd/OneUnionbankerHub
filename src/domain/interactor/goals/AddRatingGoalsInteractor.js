export default class AddRatingGoalsInteractor {
  constructor (client) {
    this.client = client
  }

  execute (ratingParam) {
    return this.client.addRatingGoal(this.client.getToken(), ratingParam)
  }
}
