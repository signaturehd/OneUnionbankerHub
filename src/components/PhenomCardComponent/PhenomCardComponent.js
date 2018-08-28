import React, { Component } from 'react'
import PropTypes from 'prop-types'

import './styles/phenomCardComponentStyle.css'

import Card from '../../ub-components/Card/Card'
import GenericButton from '../../ub-components/UButton/GenericButton'

import moment from 'moment'

import defaultImageIcon from '../../images/mcdologo.jpg'
import defaultImageBackground from '../../images/phenomtest.jpg'

class PhenomCardComponent extends Component {
  constructor (props) {
    super(props)
  }


  render () {

    const {
      onClick,
      onChangeHeart,
      selected,
      id,
      vendor,
      rewardImage,
      isHeart,
      style,
      endDate,
      startDate,
      selectedDetails
    } = this.props

    return (
      <Card
        onClick = { () => onClick(selectedDetails) }
        style = {{
          backgroundImage : `url(${ rewardImage ? rewardImage : defaultImageBackground })`,
          height: '200px',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          cursor: 'pointer',
        }} >
        <div className = { 'phenom-card-grid-content' }>
          <div className = { 'phenom-content-card' }>
            <div
              className = { 'phenom-content-grid-column-right' }>
              <img
                className = { 'phenom-logo-icon-default' }
                src = { `${ vendor.image ? vendor.image : defaultImageIcon }` }/>
              <div>
                <h2 className = { 'phenom-label-reward' }>
                  { vendor.name }
                </h2>
              </div>
            </div>
            <div className = { 'phenom-content-grid-column-left' }>
              <span
                onClick = { () => onChangeHeart(id) }
                className = { 'phenom-status-icon phenom-icon' }/>
            </div>
          </div>
          <div></div>
          <div></div>
          <div>
            <h2 className = { 'phenom-date-validity' }>
             { moment(endDate).diff(startDate, 'weeks') } weeks remaining
            </h2>
          </div>
        </div>
      </Card>
    )
  }
}

PhenomCardComponent.propTypes = {
  onClick : PropTypes.func,
  onChangeHeart : PropTypes.func,
  selected : PropTypes.number,
  id : PropTypes.string,
  vendor : PropTypes.object,
  rewardImage : PropTypes.string,
  isHeart : PropTypes.string,
  style : PropTypes.string,
  endDate : PropTypes.string,
  startDate : PropTypes.string,
  selectedDetails : PropTypes.array,
}

PhenomCardComponent.defaultProps = {
  children : null,
  selected : -1,
}

export default PhenomCardComponent
