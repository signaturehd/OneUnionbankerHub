export default class GetAffirmationStatusInteractor {
  constructor (client) {
    this.client = client
  }

  execute () {
    return this.client.getAffirmationsStatus(this.client.getToken())
    .map((resp, key) => {
      let newAffirmationArray = []
      const documentCardOptions = [
        {
          id: 0,
          title: 'Pre-Employment Undertaking',
          link: '/2018-09-11/12345-Pre-employment Undertaking-1536641036614.pdf'
        },{
          id: 1,
          title: 'Acceptable use of IT Resource Policy',
          link: '/2018-09-11/12345-Acceptable Use of IT Resource Policy-1536640939395.pdf'
        },{
          id: 2,
          title: 'Undertaking of Confidentiality',
          link: '/2018-09-11/12345-Undertaking on Confidentiality-1536641093668.pdf'
        },{
          id: 2,
          title: '/2018-09-11/12345-Law on Secrecy of Bank Deposits-1536640999233.pdf',
        },
      ]
      documentCardOptions.map((resp, key) =>{
          const tempArrayObject = [{
            affirmId: resp.id,
            affirmTitle : resp.title,
            affirmLink: resp.link,
          }]
        }
      )
    })
  }
}
