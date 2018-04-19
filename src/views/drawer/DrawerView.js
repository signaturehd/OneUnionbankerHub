import React from 'react'
import { Switch, Route } from 'react-router-dom'
import BaseMVPView from '../common/base/BaseMVPView'

import ConnectView from '../../utils/ConnectView'

import BenefitsPartial from '../benefits/BenefitsPartial'
import LibraryView from '../Library/LibraryView'

import Presenter from './presenter/DrawerPresenter'

import Uploader from '../../ub-components/FileUploader/Uploader';

class DrawerView extends BaseMVPView {
  constructor (props) {
    super(props)
  }

  render () {
    // TODO render tru react router each partial page, (profile, settings, benefits, etc)
    return (
      <div>
        TODO sidebar here lol
        <button onClick={ () => this.presenter.logout() }>Logout</button>
        <Switch>
          <Route path = '/benefits' render={props => <BenefitsPartial parent = { this } />} />
          <Route path = '/library' render={props => 
             <LibraryView parent = { this } />
          } />
            <Route path = '/optical' render={props =>
                <Uploader parent = { this } />
            } />
        </Switch>

      </div>
    )
  }
}

export default ConnectView(DrawerView, Presenter)
