import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { Card } from '../../../../ub-components/'

import { FaEye } from 'react-icons/lib/fa/'
import './styles.css'

class NewsCardComponent extends Component {
  constructor (props) {
    super(props)
  }

  render () {
    const { news, onClick , imageUrl} = this.props

    const style = {
        newsBackground: 
        {
          background : "url(" + news.imageUrl + ") rgb(0,0,0,0.7)",
          backgroundSize : "40px no-repeat ",
          height : "50px",
          width: "auto",
          backgroundBlendMode: "color",
          color : "white",
          fontWeight : "bold"
        }
    }


      return (
        <Card>
          <div></div>
          <div style = { style.newsBackground } className = {'news-body'}>
            <h3>{news.title}</h3>
          </div>
          <div className = {'card-footer'}>
            <a href = {news.linkUrl}>
            <FaEye 
              className = { 'fa-see-more' } />
            </a>
            <small><a onClick = { () => onClick(news) }>Read More</a></small>
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
