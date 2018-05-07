import React, { Component } from 'react'
import PropTypes from 'prop-types'
import PodCardComponent from '../../../common/components/PodCardComponent/PodCardComponent'

class PodCastsListFragment extends Component {
  constructor (props) {
    super(props)
    this.state = {
      rating : false,
      view : false,
      details : null
    }
  }

  addRating (id, rating) {
    this.props.presenter.rateBook(id, rating)
  }

  render () {
    const { books, detail } = this.props
    const { details, news } = this.state    
    let _news = this.state.news
    let search = this.state.searchString.trim().toLowerCase()
    if (search.length > 0) {
      _news = _news.filter(function( news ) {
        return news.title.toLowerCase().match(search)
      })
    }
    return (
      <div className = {'library-container'}>
      {
          _news.map((news, i) =>
            <PodCardComponent
             rateBook = { (id, rating) => this.addRating(id, rating) }
            
              key={ i }
              news = { news }
              onClick = { details => this.setState({ details, show: true })  } />
            )
        }
      </div>
    )
  }
}

export default PodCastsListFragment
