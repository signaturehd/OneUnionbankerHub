import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Table from '../table/Table'
import Application from '../accordion/Accordion'


class PodcastListView extends Component {
  constructor (props) {
    super(props)
  }

  render () {
    const { title, author, description } = this.props

    return (
      <div className = { 'container-option1' }  >
        <h1> Podcasts </h1>
        <div className={'container-option1'}> <Application/> </div> 
      


      </div>
    )
  }
}

PodcastListView.propTypes = {
  onClick : PropTypes.func,
  title : PropTypes.string,
  description : PropTypes.string,
  image : PropTypes.string,
  author : PropTypes.string,
  rating : PropTypes.number,
  id : PropTypes.string
}

PodcastListView.defaultProps = {
  title : 'title',
  description : 'description',
  author : 'author',
  image : 'image',
  rating : 0,
}


export default PodcastListView
