import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { Card, Line, GenericInput, GenericButton } from '../../../ub-components/'

import Rating from 'react-rating'

import './styles/profileSettings.css'

import ChildrenFragment
  from '../../preemploymentfragment/childrenform/ChildrenFragment'

function Dependents (props) {
  const id = props.id
  if(id === 0) {
    try {
      return (
        <ChildrenFragment
          onSendPageNumberToView = { 18 }
        />
      )
    } catch(e) {
       console.log(e)
    }
  } else if (id === 1) {
    return (
      <div>test</div>
    )
  }
}

class SettingsAddDependentsComponent extends Component {

  constructor (props) {
    super(props)
    this.state = {
      id: '',
      showEditOption: false,
    }
  }

  componentDidMount () {
    this.props.history.push('/dependent/children')
  }

  render () {
    const addDependentsObject = [{
      id : 0,
      name : 'Adding of Dependent Child',
    }, {
      id : 1,
      name: 'Adding of Dependent Siblings',
    }, {
      id: 2,
      name: 'Adding of Dependent Spouse'
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
          {
            showEditOption ?
            <Dependents
              id = { id }/>
            :
            <div>
              <div className = { 'text-align-left' }>
                <GenericButton
                  className = { 'global-button profile-button-small' }
                  text = { 'Back to Profile' }
                  onClick = { () =>
                    showEditDependentModalFunc(false)
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
                      onClick = { () => this.setState({ showEditOption: true, id : resp.id }) }
                      key = { key }>
                      <h2>{ resp.name }</h2>
                    </Card>
                  ))
                }
              </div>
            </div>
          }
        </div>
        <div></div>
      </div>
    )
  }
}


export default SettingsAddDependentsComponent
