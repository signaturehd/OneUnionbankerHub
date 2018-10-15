import React, { Component } from 'react'
import PropTypes from 'prop-types'

import {
  GenericInput,
  Card,
  GenericButton,
  Line
} from '../../../ub-components/'

import './styles/phenomDetailsStyle.css'

import store from '../../../store'
import { NotifyActions } from '../../../actions/'


import defaultImageIcon from '../../../images/mcdologo.jpg'
import defaultImageBackground from '../../../images/profile-picture.png'

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
    rewardLogo,
    contactInfo,
    highlights,
    rewardName,
    terms,
    rewardSubHeader
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
                  backgroundImage : `url(${ rewardImage ? defaultImageBackground : rewardImage })`,
                  height: '200px',
                  paddingTop: '135px',
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
              <div className = { 'phenom-details-row-container-x2' }>
                <div className = { 'text-align-center phenom-padding' }>
                  <div>
                    <div className = { 'font-size-20px font-weight-bold' }>{
                        rewardName &&
                        rewardName ?
                        rewardName : '(Not Yet Provided)'
                      }</div>
                    <div className = { 'unionbank-color font-size-14px' }>
                      { rewardSubHeader ? rewardSubHeader : '(Not Yet Provided)' }
                    </div>
                  </div>
                </div>
                <div className = { 'grid-global' }>
                  <div className = { 'phenom-details-row-content' }>
                    <h2 className = { 'font-weight-bold unionbank-color' }>
                      Contact Information
                    </h2>
                    <br/>
                    <div className = { 'phenom-details-contact-grid' }>
                      <div className = { 'font-size-14px' }>{
                          contactInfo &&
                          contactInfo.contactNo ?
                          contactInfo.contactNo : '(Not Yet Provided)'
                        }</div>
                      <div className = { 'unionbank-color font-size-12px' }>
                        Contact Number
                      </div>
                    </div>
                    <br/>
                    <div className = { 'phenom-details-contact-grid' }>
                      <div className = { 'font-size-14px' }>{
                          contactInfo &&
                          contactInfo.email ?
                          contactInfo.email : '(Not Yet Provided)'
                        }</div>
                      <div className = { 'unionbank-color font-size-12px' }>
                        Email Address
                      </div>
                    </div>
                    <br/>
                    <div className = { 'phenom-details-contact-grid' }>
                      <div className = { 'font-size-14px' }>{
                          contactInfo &&
                          contactInfo.telNo ?
                          contactInfo.telNo : '(Not Yet Provided)'
                        }</div>
                      <div className = { 'unionbank-color font-size-12px' }>
                        Tell No.
                      </div>
                    </div>
                  </div>
                  <div className = { 'phenom-details-row-content' }>
                    <h2 className = { 'font-weight-bold unionbank-color' }> Highlights </h2>
                    <br/>
                    <div className = { 'phenom-details-contact-grid' }>
                      <div className = { 'font-size-14px' }>{
                          highlights &&
                          highlights ?
                          highlights : '(Not Yet Provided)'
                        }</div>
                      <div></div>
                    </div>
                  </div>
                </div>
                <div className = { 'phenom-details-row-content' }>
                  <h2 className = { 'font-weight-bold unionbank-color' }> Terms & Condition </h2>
                  <br/>
                  <div className = { 'phenom-details-contact-grid' }>
                    {
                      terms.map((resp, key) =>
                      <li
                        key = { key }
                        className = { 'font-size-14px' }>{
                          resp.terms ?
                          resp.terms : '(Not Yet Provided)'
                        }</li>
                      )
                    }
                    <div></div>
                  </div>
                </div>
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
  highlights : PropTypes.string,
  contactInfo : PropTypes.object,
  rewardName : PropTypes.string,
  rewardSubHeader : PropTypes.string,
  terms : PropTypes.array,
}

export default PhenomCardDetailsComponent
