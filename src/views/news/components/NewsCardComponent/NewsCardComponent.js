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
    const { news, onClick , imageUrl } = this.props

    const style = {
        newsBackground:
        {
          background : `url(${news.imageUrl}) rgba(0,0,0,0.7)`,
          backgroundRepeat : 'no-repeat',
          width: 'auto',
          backgroundBlendMode: 'color',
          backgroundSize: '100% auto',
          color : 'white',
          fontWeight : 'bold'
        }
    }


      return (
        <Card>
          <div style = { style.newsBackground } className = {'news-body'}>
            <FaEye
              className = { 'fa-see-more' } onClick = { () => onClick(news) }  />
            <h3>{news.title}</h3>

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
