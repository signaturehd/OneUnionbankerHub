import React, { Component } from 'react'
import PropTypes from 'prop-types'

import FaqCardComponent from '../components/FaqCardComponent'

class FaqListFragment extends Component {
  constructor (props) {
    super(props)

    this.state = {
      searchString: '',
    }
  }

  search (searchString) {
    this.setState({ searchString })
  }

  render () {
    const { searchString } = this.state
    const { selectedFaqCategory, setSelectedFaqQuestion, history } = this.props

    return (
      <div className = {'container'}>
        <i className = { 'left' } onClick = { () => history.push('/faqs') }></i>
        <h1 className = { 'title-view' }>{selectedFaqCategory && selectedFaqCategory.category }</h1>
        <input type = 'text'
          className = 'faqsSearchBar'
          placeholder = 'Search FAQs'
          value = { this.state.searchString }
          onChange = { () => this.search(e.target.value) } />
        <div className = {'card-container'}>
        {
          selectedFaqCategory &&
          selectedFaqCategory.question &&
          selectedFaqCategory.question.map((qtn, i) =>
            <FaqCardComponent
              key = { i }
              title = { qtn && qtn.title }
              onClick = { () => setSelectedFaqQuestion(qtn) } />
          )
        }
        </div>
      </div>
    )
  }
}

FaqListFragment.propTypes = {
  selectedFaqCategory: PropTypes.object,
  setSelectedFaqQuestion: PropTypes.func,
}

export default FaqListFragment
