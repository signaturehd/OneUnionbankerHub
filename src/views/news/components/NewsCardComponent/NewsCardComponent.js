import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { Card, GenericButton, SkeletalLoader, Line } from '../../../../ub-components/'
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
      borderRadius: '15px',
    }
    const detailsFiltered = news && news.details.substr(0, 30)
    console.log()
    return (
      <Card
        className = { 'home-card-view' }>
        <div className = { 'home-test-background' }>
          {
            news.imageUrl.includes('/2018-') ?
            <SkeletalLoader
              boxSizeObject = {{
                width : 200,
                height: 105,
              }}
              shapeBox = { true }
              />
            :
            <img
              src={ news.imageUrl }/>
          }
        </div>
        <div className = { 'home-card-padding' }>
          <h2 className = { 'unionbank-color font-size-18px font-weight-bold' }>{ news.title }</h2>
          <h2 className = { 'font-size-12px font-weight-normal' }>
            {
              news.date && moment(news.date).format('MMMM DD, YYYY')
            }
          </h2>
          <br/>
          <p className = { 'font-size-15px font-weight-normal' }>
            { detailsFiltered }...
          </p>
          <br/>
          <center>
            <GenericButton
              className = { 'global-button profile-button-small' }
              text= { 'Read More' }
              onClick = { () =>
                this.openLink() }
              />
          </center>
        </div>
        <div className = { ' home-card-padding text-align-left' }>
          <Line/>
            <div className = { 'news-like-grid' }>
              <h2
                className = { 'cursor-pointer' }
                onClick = { () => {
                  this.setState({ isHeartActive : isHeartActive === 0 ? 1 : 0  })
                  onChangeHeart(news.id, news.isHeart)
                }
              }
              className = { (parseInt(isHeartActive) !== 1 ? 'news-status-icon' : 'news-heart-icon') + ' news-icon' }/>
            <h2 className = { 'unionbank-color font-size-16px text-align-left' }>{ news && news.total }</h2>
            </div>
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
