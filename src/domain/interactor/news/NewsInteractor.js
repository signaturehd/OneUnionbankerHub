<<<<<<< HEAD
export default class NewsInteractor
{
=======
export default class NewsInteractor {
>>>>>>> 7cf23bbb6f50fd66d0c4f86515a65c2bf03bddc0
  constructor (client) {
    this.client = client
  }

  execute () {
<<<<<<< HEAD
    return this.client.getNews()
  }
}
=======
    return this.client.getNews(this.client.getToken())
  }
}
>>>>>>> 7cf23bbb6f50fd66d0c4f86515a65c2bf03bddc0
