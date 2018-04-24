import React, { Component } from 'react'
import PropTypes from 'prop-types'

import './styles.css'

class BookRecommendationFragment extends Component {
  constructor (props) {
    super(props)
  }

  render () {
    const { title, author, description } = this.props

    return (
      <div className = { 'container-option1' }  >
      <h1> Tab 2 </h1>
      </div>
    )
  }
}

BookRecommendationFragment.propTypes = {
  onClick : PropTypes.func,
  title : PropTypes.string,
  description : PropTypes.string,
  image : PropTypes.string,
  author : PropTypes.string,
  rating : PropTypes.number,
  id : PropTypes.string
}

BookRecommendationFragment.defaultProps = {
  title : 'title',
  description : 'description',
  author : 'author',
  image : 'image',
  rating : 0,
}


export default BookRecommendationFragment
