import React from 'react'
import PropTypes from 'prop-types'
import { Switch, Route } from 'react-router-dom'
import BaseMVPView from '../common/base/BaseMVPView'
import ConnectView from '../../utils/ConnectView'
import Presenter from './presenter/NavigationPresenter'

import LibraryFragment from '../library/LibraryFragment'
import BenefitsFragment from '../benefits/BenefitsFragment'
import TransactionFragment from '../transaction/TransactionFragment'
import NewsFragment from '../news/NewsFragment'
import FaqFragment from '../faq/FaqFragment'
import SettingsFragment from '../settings/SettingsFragment'
import PodcastView from '../podcast/PodcastView'

import DrawerAppBar from './components/appbar/DrawerAppBar'
import SideBar from './components/sidebar/SideBar'
import Drawer from './components/drawer/Drawer'

import './styles/drawerview.css'

import { connect } from 'react-redux'

class NavigationView extends BaseMVPView {
  constructor (props) {
    super (props)

    this.state = {
      selected: 0,
    }

    this.setDisplay = this.setDisplay.bind(this)
    this.setSelectedNavigation = this.setSelectedNavigation.bind(this)
    this.callLogout = this.callLogout.bind(this)
  }

  setDisplay (sideBar, topBar) {
    this.setState ({ displayShow : sideBar })
    this.setState({ displayNavIcon : topBar })
  }

  componentWillMount () {
    const mediaQuery = window.matchMedia('(min-width: 1201px)')
      if (mediaQuery.matches) {
        this.setDisplay('block', 'none')
      } else {
        this.setDisplay('none', 'block')
      }
        mediaQuery.addListener(mq => {
      if (mq.matches) {
        this.setDisplay('block', 'none')
      } else {
        this.setDisplay('none', 'block')
      }
    })
  }

  componentDidMount () {
    this.presenter.getLibraries()
  }

  setSelectedNavigation (id) {
    this.setState({ selected: id })
  }
  callLogout () {
    this.presenter.logout()
  }
  render () {
    const { displayShow, displayNavIcon, displayNavIconState, selected, onClick } = this.state
    const style = {
      show: {
          display : displayShow
      }
    }
    return (
        <div className = { 'body-div' }>
          <header className = { 'page-boundary page-boundary--fixed-top' }>
            <DrawerAppBar
              onClick = { onClick }
              displayNavIcon = { displayNavIcon } displayShow = { displayShow }
              hide = { () => this.setState({ displayShow : 'block' })}
              show = { () => this.setState({ displayShow : 'none' })} />
          </header>
          <div className="panels">
              <main className ="panel main-content " role="main">
              { super.render() }
                  <Drawer >
                      <Switch>
                        <Route exact path = '/' render = {props =>
                          <NewsFragment { ...props }
                            setSelectedNavigation = { this.setSelectedNavigation } /> }/>
                        <Route path = '/benefits' render = { props =>
                          <BenefitsFragment { ...props }
                            setSelectedNavigation = { this.setSelectedNavigation } /> } />
                        <Route path = '/transactions' render = { props =>
                          <TransactionFragment { ...props }
                            setSelectedNavigation = { this.setSelectedNavigation } /> } />
                        <Route path = '/faqs' render = { props =>
                          <FaqFragment { ...props }
                            setSelectedNavigation = { this.setSelectedNavigation } /> } />
                        <Route path = '/settings' render = { props =>
                          <SettingsFragment { ...props }
                            setSelectedNavigation = { this.setSelectedNavigation } /> } />
                        <Route path = '/books' render = { props =>
                            <LibraryFragment { ...props }
                              setSelectedNavigation = { this.setSelectedNavigation } /> } />
                              <Route path = '/podcast' render = { props =>
                          <PodcastView { ...props }
                            setSelectedNavigation = { this.setSelectedNavigation } /> } />
                     </Switch>
                    </Drawer>
              </main>
              <aside
                className ="left-side panel"
                style = { style.show }>
                <SideBar
                  selected={ selected }
                  onNavigationClick = { path => this.props.history.push(path) } >
                 </SideBar>
              </aside>
          </div>
        </div>
    )
  }
}

NavigationView.propTypes = {
  onClick : PropTypes.func,
}

const mapStateToProps = state => ({
  notify : state.notify
})


export default ConnectView(connect(mapStateToProps)(NavigationView), Presenter)
