import React from 'react'
import PropTypes from 'prop-types'
import ConnectView from '../../utils/ConnectView'

import Presenter from './presenter/HomePresenter'
import BaseMVPView from '../common/base/BaseMVPView'
import ConnectPartial from '../../utils/ConnectPartial'

import {
  CircularLoader,
  GenericInput,
  Line,
  Card,
  GenericButton,
  SkeletalLoader,
} from '../../ub-components'

import HomeGreetingsComponent from './components/HomeGreetingsComponent'

//News Fragment
import NewsFragment from '../news/NewsFragment'
//Phenom Fragment
import Phenom from '../phenom/PhenomFragment'

import './styles/homeStyle.css'

class HomeFragment extends BaseMVPView {
  constructor (props) {
    super(props)
    this.state = {
      greetingsMessage : '',
      employeeName  : '',
      homePreview  : false,
    }
  }

  componentDidMount () {
    this.presenter.getCheckGreetingsStatus()
    this.presenter.getProfile()
    this.props.setSelectedNavigation(0)
    this.setState({ homePreview : true })
  }

  showGreetingsMessage (greetingsMessage) {
    this.setState({ greetingsMessage })
  }

  showProfileName (employeeName ) {
    this.setState({ employeeName })
  }

  render () {
    const {
      greetingsMessage,
      employeeName,
      homePreview
    } = this.state

    const {
      storeWidth,
      history,
      setSelectedNavigation
    } = this.props

    return (
      <div className = { 'home-fragment-view' }>
        <div></div>
        <div className = { 'home-grid-fragment' }>
          <div>
            <NewsFragment
              storeWidth = { storeWidth }
            />
          </div>
          <div>
            <Phenom
              history = { history }
              setSelectedNavigation = { (e) => setSelectedNavigation(e) }
              homePreview = { homePreview }
              homePreviewFunc = { (homePreview) => this.setState({ homePreview }) }
             />
            <br/>
          </div>
        </div>
        <div></div>
      </div>
    )
  }
}

HomeFragment.propTypes = {
  setSelectedNavigation: PropTypes.func,
}

export default ConnectView(HomeFragment, Presenter)
