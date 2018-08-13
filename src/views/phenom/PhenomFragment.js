import React from 'react'
import { Switch, Route, createBrowserHistory } from 'react-router-dom'
import PropTypes from 'prop-types'

import BaseMVPView from '../common/base/BaseMVPView'
import ConnectView from '../../utils/ConnectView'
import Presenter from './presenter/PhenomPresenter'

/*Phenom Component*/
import { PhenomCardComponent } from '../../components/'

import './styles/phenomStyle.css'

class PhenomFragment extends BaseMVPView {
  constructor (props) {
    super (props)
    this.state = {
      phenomDataList : [],
    }
  }

  componentDidMount () {
    this.props.setSelectedNavigation(10)
  }

  showPhenomData (phenomDataList) {
    this.setState({ phenomDataList })
  }

  render () {
    const mylearning = [{
      id: 0 ,
      styleName: 'mylearning-cards-1 font-weight-bold',
      title: 'Borrow Books',
      description: 'Lorem ipsum dolor',
      path: '/mylearning/books',
    }, {
      id: 1 ,
      styleName: 'mylearning-cards-2 font-weight-bold',
      title: 'Listen Podcasts',
      description: 'Lorem ipsum dolor',
      path: '/mylearning/podcasts',
    }, {
      id: 2 ,
      styleName: 'mylearning-cards-3 font-weight-bold',
      title: 'Enroll to Trainings',
      description: 'Lorem ipsum dolor',
      path: '/mylearning/trainings',
    }]

    const { phenomDataList } = this.state
    const { setSelectedNavigation } = this.props
    return (
      <div className = { 'phenom-fragment' }>
        <h2 className = { 'header-margin-default ' }>Phenom</h2>
        <div className = { 'phenom-container-component' }>
          
        </div>
      </div>
    )
  }
}

PhenomFragment.propTypes = {
  setSelectedNavigation : PropTypes.func,
}

export default ConnectView (PhenomFragment, Presenter)
