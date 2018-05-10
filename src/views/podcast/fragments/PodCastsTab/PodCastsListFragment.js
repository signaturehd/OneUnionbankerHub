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
    const { podcasts, _podcasts } = this.props
    return (
  <div className = {'podcasts-container'}>
    {
      _podcasts.map((podcasts, i) =>
        <PodCardComponent
          history = { this.props.history }
          rateBook = { (id, rating) => this.addRating(id, rating) }
          key={ i }
          podcasts = { podcasts }
          onClick = { details => {
            this.setState({ details, show: true })
          }} />
        )
      }
      </div>
    )}
  }

export default PodCastsListFragment
