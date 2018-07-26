export default class ValidateOutPatientReimbursementInteractor {
  constructor (client) {
    this.client = client
  }

  execute () {
    return this.client.validateOutPatientReimbursement(this.client.getToken())
    .map(resp => {
      const personal = {
        id: 1,
        name: 'Me',
      } // create instance of "Me/Personal"

      resp.dependents.push(personal) // add the personal/me to the dependents option

      return resp
    })
  }
}
