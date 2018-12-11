import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { Switch, Route, createBrowserHistory } from 'react-router-dom'

import BaseMVPView from '../common/base/BaseMVPView'
import ConnectView from '../../utils/ConnectView'
import Presenter  from './presenter/DependentPresenter'

import ChildrenFragment
  from '../preemploymentfragment/childrenform/ChildrenFragment'

import { Card, Modal, GenericButton   } from '../../ub-components/'

class AddingDependentsFragment extends BaseMVPView {

  constructor (props) {
    super(props)
    this.state = {
      id: '',
      showEditOption: false,
    }
  }

  render () {
    let addDependentsObject = [{
      id : 0,
      name : 'Adding of Dependent Child',
      action: () => this.props.history.push('/dependentchildren'),
    }, {
      id : 1,
      name: 'Adding of Dependent Parents & Siblings',
      action: () => this.props.history.push('/dependentsiblings'),
    }, {
      id: 2,
      name: 'Adding of Dependent Spouse',
      action: () => this.props.history.push('/dependentspouse'),
    }]

    const {
      showEditDependentModalFunc
    } = this.props

    const {
      id,
      showEditOption
    } = this.state

    return (
      <div className={ 'settings-dependent-container' }>
        <div></div>
        <div>
          <div className = { 'text-align-left' }>
            <GenericButton
              className = { 'global-button profile-button-small' }
              text = { 'Back to Profile' }
              onClick = { () =>
                this.props.history.push('/settings')
              }
            />
          </div>
          <br/>
          <br/>
          <div>
            <h2 className={ 'font-size-30px text-align-center' }>Adding of Dependents</h2>
            <br/>
            <h4></h4>
          </div>
          <br/>
          <div>
            {
              addDependentsObject.map((resp, key) => (
                <Card
                  className = { 'profile-card-list cursor-pointer' }
                  onClick = { resp.action }
                  key = { key }>
                  <h2>{ resp.name }</h2>
                </Card>
              ))
            }
          </div>
        </div>
        <div></div>
      </div>
    )
  }
}


export default ConnectView(AddingDependentsFragment, Presenter)
