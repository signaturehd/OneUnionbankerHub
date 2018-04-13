import { RxHR } from '@akanass/rx-http-request'

import HRBenefitsService from '../data/service/HRBenefitsService'
import HRBenefitsClient from '../data/service/HRBenefitsClient'
import SessionProvider from '../data/provider/SessionProvider'

export default container => {
  container.singleton('SessionProvider', SessionProvider);

  container.singleton('ApiClient',
    RxHR.defaults({
      baseUrl: BASE_URL,
      headers: {
        'X-IBM-Client-Id': CLIENT_ID,
        'X-IBM-Client-Secret': CLIENT_SECRET,
        'token': container.get('SessionProvider').getToken(),
      }
    })
  );

  container.singleton('AccountClient',
    RxHR.defaults({
      baseUrl: BASE_URL,
      headers: {
        'X-IBM-Client-Id': CLIENT_ID,
        'X-IBM-Client-Secret': CLIENT_SECRET,
        'token': container.get('SessionProvider').getAccountToken(),
      }
    })
  );

  container.singleton('HRBenefitsService', HRBenefitsService, ['ApiClient', 'AccountClient']);
  container.singleton('HRBenefitsClient', HRBenefitsClient, ['HRBenefitsService', 'SessionProvider']);

  return container
}
