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
      const { news, _news } = this.props
    return (
      <div className = {'podcasts-container'}>
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
