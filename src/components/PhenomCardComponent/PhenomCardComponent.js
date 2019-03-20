import React, { Component } from 'react'
import PropTypes from 'prop-types'

import './styles/phenomCardComponentStyle.css'

import Card from '../../ub-components/Card/Card'
import GenericButton from '../../ub-components/UButton/GenericButton'

import moment from 'moment'

import defaultImageIcon from '../../images/profile-picture.png'
import defaultImageBackground from '../../images/profile-picture.png'

class PhenomCardComponent extends Component {
  constructor (props) {
    super(props)
    this.state = {
      isHeartActive :props.isHeart,
    }
  }

  render () {
    const { isHeartActive } = this.state
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
        style = {{
          backgroundImage : `url(${ rewardImage ? rewardImage : 'https://www.google.com/url?sa=i&source=images&cd=&cad=rja&uact=8&ved=2ahUKEwjsv5DT0fngAhWXd94KHZvUAjMQjRx6BAgBEAU&url=https%3A%2F%2Fstackoverflow.com%2Fquestions%2F27963555%2Fdisplay-image-in-jsp-using-image-url&psig=AOvVaw3bOyhjdw0iY99xbeit0G8h&ust=1552378216652430' })`,
          height: '200px',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          cursor: 'pointer',
        }} >
        <div id = { 'phenom-overlay-body' }>
          <div
            className = { 'phenom-card-grid-content' }>
            <div className = { 'phenom-content-card' }>
              <div
                className = { 'phenom-content-grid-column-right' }>
                <img
                  className = { 'phenom-logo-icon-default' }
                  src = { `${ vendor.imageBlob ? vendor.imageBlob : defaultImageIcon }` }/>
                <div>
                  <h2 className = { 'phenom-label-reward' }>
                    { vendor.name }
                  </h2>
                </div>
              </div>
              <div className = { 'phenom-content-grid-column-left' }
                onClick = { () => null }>
                <span
                  onClick = { () => {
                    this.setState({ isHeartActive : isHeartActive === 0 ? 1 : 0  })
                    onChangeHeart(id, isHeart)
                  }
                }
                  className = { (parseInt(isHeartActive) !== 1 ? 'phenom-status-icon' : 'phenom-heart-icon') + ' phenom-icon' }/>
              </div>
            </div>
            <div
              onClick = { () => onClick(selectedDetails) }></div>
            <div
              onClick = { () => onClick(selectedDetails) }></div>
            <div
              onClick = { () => onClick(selectedDetails) }>
              <h2 className = { 'phenom-date-validity' }>
               { moment(endDate).diff(startDate, 'weeks') } weeks remaining
              </h2>
            </div>
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
