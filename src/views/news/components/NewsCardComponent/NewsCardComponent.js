import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { Card, GenericButton } from '../../../../ub-components/'
import moment from 'moment'
import { FaEye } from 'react-icons/lib/fa/'
import './styles/newsCardComponent.css'

class NewsCardComponent extends Component {
  constructor (props) {
    super(props)
    this.state = {
      isHeartActive : props.news.isHeart
    }
  }

  openLink () {
    const { news } = this.props
    window.open(news.linkUrl)
  }

  render () {
    const { isHeartActive } = this.state
    const {
      news,
      onClick ,
      imageUrl,
      onChangeHeart
    } = this.props

    const style = {
      backgroundImage : `url(${news.imageUrl})`,
      backgroundRepeat : 'no-repeat',
      backgroundSize: 'cover',
      height: 'unset',
      backgroundPosition: 'center',
    }
    const detailsFiltered = news && news.details.substr(0, 200)

    return (
      <Card className = { 'news-card' }>
        <div
          style = { style }
          className = {'news-body'} >
        </div>
        <div className = { 'news-details-card' }>
          <div className = { 'news-grid' }>
            <h2 className = { 'unionbank-color font-weight-bold font-size-22px' }>{ news.title }</h2>
            <div className = { 'news-like-grid' }>
              <h2
                className = { 'cursor-pointer' }
                onClick = { () => {
                  this.setState({ isHeartActive : isHeartActive === 0 ? 1 : 0  })
                  onChangeHeart(news.id, news.isHeart)
                }
              }
              className = { (parseInt(isHeartActive) !== 1 ? 'news-status-icon' : 'news-heart-icon') + ' news-icon' }/>
              <h2 className = { 'unionbank-color font-size-12px text-align-center' }>{ news && news.total }</h2>
            </div>
          </div>
          <br/>
          <h2 className= { 'news-limit-text font-size-16px font-weight-lighter text-align-justify' }>{ detailsFiltered } ...</h2>
          <br/>
          <div className = { 'text-align-right' }>
            <GenericButton
              onClick = { () =>
                this.openLink() }
              className = { 'profile-button-medium cursor-pointer global-button' }
              text = { 'Read More' }
              />
          </div>
          <br/>
        </div>
      </Card>
    )
  }
}

NewsCardComponent.propTypes = {
  news : PropTypes.object,
  onClick : PropTypes.func
}

NewsCardComponent.defaultProps = {

}

export default NewsCardComponent
