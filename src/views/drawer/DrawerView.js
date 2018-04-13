import React from 'react'
import { Switch, Route } from 'react-router-dom'
import BaseMVPView from '../common/base/BaseMVPView'

import ConnectView from '../../utils/ConnectView'

import BenefitsPartial from '../benefits/BenefitsPartial'
import LibraryView from '../Library/LibraryView'
import NewsView from '../news/NewsView'
import Presenter from './presenter/DrawerPresenter'

import TransactionsView from '../transactions/TransactionsView'

import { GenericCard } from '../../ub-components/Cards/'
import SnackBar, { Snackbar } from '../../ub-components/Snackbar/SnackBar'
import StarRating from '../../ub-components/Starrating/StarRating'
import FaqsView from '../faqs/FaqsView'

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
          <Route path = '/library' render={props => {
            console.log('showing library')
            return <LibraryView parent = { this } />
          }} />
            <Route path = '/news' render={props => {
            console.log('showing news')
            return <NewsView parent = { this } />
          }} />
          <Route path = '/snack' render={props => {
            console.log('showing SNacks')
            return <SnackBar parent = { this } />
          }} />
           <Route path = '/star' render={props => {
            console.log('showing stars')
            return <StarRating parent = { this } />
          }} />
            <Route path = '/faqs' render={props => {
                console.log('showing faqs')
                return <FaqsView parent = { this } />
            }} />
            <Route path = '/transactions' render={props => {
                console.log('showing transactions')
                return <TransactionsView parent = { this } />
            }} />

        </Switch>
        
      </div>
    )
  }
}

export default ConnectView(DrawerView, Presenter)
