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
      onChangeHeart,
      key
    } = this.props

    const style = {
      iconNews : {
        backgroundImage : `url(${news.imageUrl})`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        height: '100%',
        margin: '0px auto',
        width: '100%',
        borderRadius: '5px 5px 0px 0px',
      }
    }
    const detailsFiltered = news && news.details.substr(0, 70)
    const titleFiltered = news && news.title.substr(0, 25)
    const newDetails = detailsFiltered.length < 70  ? detailsFiltered: detailsFiltered+ '...'
    const newTitle = detailsFiltered.length < 25  ? titleFiltered : titleFiltered + '...'

    return (
      <Card
        key = { key }
        className = { 'news-list-card' }>
        <div className = { 'home-card-view' }>
          <span
            style = { style.iconNews }/>
          <div className = { 'home-card-padding' }>
            <div className = { 'news-details-size' }>
              <h2 className = { 'unionbank-color font-size-16px font-weight-bold  news-details' }>{ newTitle }</h2>
              <h2 className = { 'font-size-12px font-weight-normal' }>
                {
                  news.date && moment(news.date).format('MMMM DD, YYYY')
                }
              </h2>
              <br/>
              <p className = { 'font-size-14px font-weight-normal news-details' }>
                { newDetails }
              </p>
              <br/>
            </div>
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
