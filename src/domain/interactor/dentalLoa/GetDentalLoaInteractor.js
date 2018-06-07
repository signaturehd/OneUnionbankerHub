export default class GetDentalLoaInteractor {
  constructor (client) {
    this.client = client
  }

  execute () {
    return this.client.getDentalLoa(this.client.getToken())
    .map(resp => {
     const personal = {
       id: 1,
       name: 'Me',
       procedures: resp.procedures,
     } // create instance of "Me/Personal"

     resp.dependents.push(personal) // add the personal/me to the dependents option

     return resp
   })
  }
}
