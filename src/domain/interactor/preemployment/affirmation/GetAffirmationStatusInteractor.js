export default class GetAffirmationStatusInteractor {
  constructor (client) {
    this.client = client
  }

  execute () {
    return this.client.getAffirmationsStatus(this.client.getToken())
    .map((resp) => {
      let documentCardOptions = [
        {
          id: 1,
          title: 'Pre-Employment Undertaking',
          link: '/2018-09-11/12345-Pre-employment Undertaking-1536641036614.pdf',
          nodeStatus : resp.preEmploymentUndertaking,
        },{
          id: 2,
          title: 'Acceptable Use of IT Resource Policy',
          link: '/2018-09-11/12345-Acceptable Use of IT Resource Policy-1536640939395.pdf',
          nodeStatus: resp.itResource,
        },{
          id: 3,
          title: 'Undertaking of Confidentiality',
          link: '/2018-09-11/12345-Undertaking on Confidentiality-1536641093668.pdf',
          nodeStatus: resp.confidentiality,
        },{
          id: 4,
          title: 'Security of Bank Deposits',
          link: '/2018-09-11/12345-Law on Secrecy of Bank Deposits-1536640999233.pdf',
          nodeStatus: resp.bankSecrecy,
        },
      ]
      return documentCardOptions
    })
  }
}
