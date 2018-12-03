export default class AddCertificateOfEmploymentInteractor {
  constructor (client) {
    this.client = client
  }

  execute (bodyParam) {
    return this.client.submitCoe(this.client.getToken(), bodyParam)
  }
}
