export default class UpdateNoticeInteractor {
  constructor (client) {
    this.client = client
  }

  execute (noticeParam) {
    return this.client.updateNotice(this.client.getToken(), noticeParam)
  }
}
