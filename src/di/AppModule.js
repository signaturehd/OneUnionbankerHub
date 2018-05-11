import { Rxios } from 'rxios'

import HRBenefitsService from '../data/service/HRBenefitsService'
import HRBenefitsClient from '../data/service/HRBenefitsClient'
import SessionProvider from '../data/provider/SessionProvider'

export default container => {
  container.singleton('SessionProvider', SessionProvider)

  container.singleton('ApiClient',
    new Rxios({
      baseURL: BASE_URL,
      headers: {
        'X-IBM-Client-Id': CLIENT_ID,
        'X-IBM-Client-Secret': CLIENT_SECRET,
      },
    })
  )

  container.singleton('AccountClient',
    new Rxios({
      baseURL: BASE_URL,
      headers: {
        'X-IBM-Client-Id': CLIENT_ID,
        'X-IBM-Client-Secret': CLIENT_SECRET,
      }
    })
  )

  container.singleton('HRBenefitsService', HRBenefitsService, ['ApiClient', 'AccountClient'])
  container.singleton('HRBenefitsClient', HRBenefitsClient, ['HRBenefitsService', 'SessionProvider'])

  return container
}
