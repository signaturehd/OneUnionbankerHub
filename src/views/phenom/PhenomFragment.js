import React from 'react'
import { Switch, Route, createBrowserHistory } from 'react-router-dom'
import PropTypes from 'prop-types'

import BaseMVPView from '../common/base/BaseMVPView'
import ConnectView from '../../utils/ConnectView'
import Presenter from './presenter/PhenomPresenter'

/*Phenom Component*/
import { PhenomCardComponent } from '../../components/'
import {
  Card,
  GenericButton,
  Line
} from '../../ub-components/'

import * as PhenomFunction from './functions/PhenomFunction'

import './styles/phenomStyle.css'

class PhenomFragment extends BaseMVPView {
  constructor (props) {
    super (props)
    this.state = {
      phenomDataList : [],
      index: 6,
      activeSelect : ''
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
      styleName: 'phenom-card-style',
      title: 'Borrow Books',
      description: 'Lorem ipsum dolor',
      path: '/mylearning/books',
    }, {
      id: 1 ,
      styleName: 'phenom-card-style',
      title: 'Listen Podcasts',
      description: 'Lorem ipsum dolor',
      path: '/mylearning/podcasts',
    }, {
      id: 2 ,
      styleName: 'phenom-card-style',
      title: 'Enroll to Trainings',
      description: 'Lorem ipsum dolor',
      path: '/mylearning/trainings',
    }]

    const {
      phenomDataList,
      index,
      activeSelect
    } = this.state

    const {
      setSelectedNavigation,
      base64,
      selected
    } = this.props

    return (
      <div className = { 'phenom-fragment' }>
        <h2 className = { 'header-margin-default' }>Phenom</h2>
        {
          mylearning &&
          <div className = { 'phenom-container-component' }>
            <div className = { 'phenom-container-grid' }>
              {
                mylearning.map((resp, key) =>
                  <Card
                    className = { `${ resp.styleName }` }
                    key = { key }>
                    <div className = { 'phenom-content-card' }>
                      <div className = { 'phenom-content-grid-column-right' }>
                        <span className = { `${ base64 ? base64 : 'phenom-logo-icon' } phenom-logo-icon-default` }/>
                        <div>
                          <h2 className = { 'phenom-label-reward' }>
                            Mc Donald's
                          </h2>
                        </div>
                      </div>
                      <div className = { 'phenom-content-grid-column-left' }>
                        <span
                          onClick = { () =>
                            this.setState({ activeSelect : 'phenom-clicked' }) }
                          className = { `${ selected === resp.id ? activeSelect : 'phenom-status-icon' } phenom-icon` }/>
                      </div>
                    </div>
                  </Card>
                )
              }
            </div>
            <div>
              <div>
                <div className = { 'grid-global' }>
                  {
                    index === 6 ?
                    <div></div> :
                    <GenericButton
                      className = { 'transaction-component-button' }
                      text = { 'View Less' }
                      onClick = { () =>
                        this.setState({
                          index : PhenomFunction.indexDecreased(index)
                          })
                        }
                      />
                  }
                  <GenericButton
                    className = { 'transaction-component-button' }
                    text = { 'View More' }
                    onClick = { () =>
                      this.setState({
                        index : PhenomFunction.indexIncreased(index)
                        })
                      }
                    />
                </div>
                <Line/>
              </div>
            </div>
          </div>
        }
      </div>
    )
  }
}

PhenomFragment.propTypes = {
  setSelectedNavigation : PropTypes.func,
  selected : PropTypes.number
}

PhenomFragment.defaultProps = {
  selected : -1
}

export default ConnectView (PhenomFragment, Presenter)
