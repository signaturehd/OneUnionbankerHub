import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { Card, GenericButton } from '../../../../ub-components/'
import moment from 'moment'
import { FaEye } from 'react-icons/lib/fa/'
import './styles/newsCardComponent.css'

class NewsCardComponent extends Component {
  constructor (props) {
    super(props)
  }

  openLink () {
    const { news } = this.props
    window.open(news.linkUrl)
  }

  render () {
    const {
      news,
      onClick ,
      imageUrl
    } = this.props

    const style = {
      backgroundImage : `url(${news.imageUrl})`,
      backgroundRepeat : 'no-repeat',
      backgroundSize: 'cover',
      height: '100%',
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
          <h2 className = { 'unionbank-color font-weight-bold font-size-22px' }>{ news.title }</h2>
          <br/>
          <h2 className= { 'news-limit-text font-size-16px font-weight-lighter text-align-justify' }>{ detailsFiltered } ...</h2>
          <br/>
          <div className = { 'text-align-right' }>
            <GenericButton
              onClick = { () =>
                this.openLink() }
              className = { 'news-view-details-button' }
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
