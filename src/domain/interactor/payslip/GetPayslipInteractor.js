export default class GetPayslipInteractor {
  constructor (client) {
    this.client = client
  }

  execute () {
    return this.client.getPayslip(this.client.getToken())
    .map(resp => {
     const payslip = {
       id: 1,
       procedures: resp ? resp : 'June 11 - June 26',
     } 

     resp.push(payslip)

     return resp
   })
  }
}
