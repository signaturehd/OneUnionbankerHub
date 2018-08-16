import React, { Component } from 'react'
import PropTypes from 'prop-types'

import {
  GenericInput,
  Card,
  GenericButton,
  DatePicker,
  Line
} from '../../../ub-components/'

import './styles/phenomDetailsStyle.css'

import store from '../../../store'
import { NotifyActions } from '../../../actions/'


import defaultImageIcon from '../../../images/mcdologo.jpg'
import defaultImageBackground from '../../../images/phenomtest.jpg'

import moment from 'moment'

class PhenomCardDetailsComponent extends Component {
  constructor (props) {
    super (props)
  }

  render () {

  const {
    selectedDetails,
    onNavigate,
    rewardImage,
    rewardLogo
  } = this.props

  return (
    <div>
      <i className={ 'back-arrow' }
        onClick = { () => onNavigate() }>
      </i>
      <div className = { 'phenom-card-grid-container' }>
        <div></div>
        <div className = { 'phenom-grid-column' }>
          <div></div>
          <div>
            <Card>
              <div style = {{
                  backgroundImage : `url(${ rewardImage ? rewardImage : defaultImageBackground })`,
                  height: '200px',
                  backgroundRepeat: 'no-repeat',
                  backgroundSize: 'cover',
                  cursor: 'pointer',
                }}>
              <div
                style = {{
                  width: '120px',
                  height: '120px',
                  margin: '0px auto',
                  backgroundSize: 'cover',
                  backgroundRepeat: 'no-repeat',
                  backgroundImage: `url(${ rewardLogo ? rewardLogo : defaultImageIcon })`,
                  borderRadius: '50%',
                  backgroundPosition: 'center',
                  boxShadow: '#d8d1ca 1px 1px 1px 1px',
                }}/>
              </div>
              <div>
awdawdawd
              </div>
            </Card>
          </div>
        </div>
        <div></div>
      </div>
    </div>
    )
  }
}

PhenomCardDetailsComponent.propTypes = {
  selectedDetails : PropTypes.array,
  onNavigate : PropTypes.func,
  rewardImage : PropTypes.string,
  rewardLogo : PropTypes.string,
}

export default PhenomCardDetailsComponent
