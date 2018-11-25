import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { SkeletalLoader, Card, Line } from '../../../ub-components/'

import './NewsCardComponent/styles/newsCardComponent.css'

class NewsLoaderComponent extends Component {
  constructor (props) {
    super(props)
  }

  render () {
    const { showLoader } = this.props

    return (
      <Card
        className = { 'news-list-card' }>
        <div className = { 'home-card-view' }>
          <SkeletalLoader
            boxSizeObject = {{
              width : 200,
              height: 120,
            }}
            shapeBox = { showLoader }
            />
          <div className = { 'home-card-padding' }>
            <center>
              <br/>
              <br/>
              <SkeletalLoader
                showBulletListComponent = { showLoader }
                />
            </center>
          </div>
          <div className = { ' home-card-padding text-align-left' }>
            <Line/>
              <div className = { 'news-like-grid' }>
              <div></div>
                <h2
                  className = { 'cursor-pointer' }
                  onClick = { () => {
                    // this.setState({ isHeartActive : isHeartActive === 0 ? 1 : 0  })
                    // onChangeHeart(news.id, news.isHeart)
                  }
                }
                className = { 'news-status-icon news-icon' }/>
              <h2 className = { 'unionbank-color font-size-12px text-align-left' }>{ 0 } Likes</h2>
              </div>
          </div>
        </div>
      </Card>
    )
  }
}

NewsLoaderComponent.propTypes = {
  showLoader : PropTypes.boolean,
}

export default NewsLoaderComponent
