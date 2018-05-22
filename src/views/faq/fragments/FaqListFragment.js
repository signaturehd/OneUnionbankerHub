import React, { Component } from 'react'
import PropTypes from 'prop-types'

import FaqCardComponent from '../components/FaqCardComponent'
import './styles/faqs-fragment.css'

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
    const {
      selectedFaqCategory,
      setSelectedFaqQuestion,
      history
    } = this.props
    const setSelectedFaqsCategory  = selectedFaqCategory && selectedFaqCategory.question
    let searchQuestions = setSelectedFaqsCategory
    const search = this.state.searchString.trim().toLowerCase()
    if (search.length > 0) {
        searchQuestions = setSelectedFaqsCategory.filter(setSelectedFaqsCategory => setSelectedFaqsCategory.title.toLowerCase().match(search))
    }
    return (
      <div className = {'container'}>
        <i className = { 'left' } onClick = { () => history.push('/faqs') }></i>
        <h1 className = { 'title-view' }>{selectedFaqCategory && selectedFaqCategory.category }</h1>
        <input type = 'text'
          className = 'faqsSearchBar'
          placeholder = 'Search FAQs'
          value = { this.state.searchString }
          onChange = { e => this.search(e.target.value) } />
        <div className = {'card-container'}>
        {
          searchQuestions ?
            searchQuestions.map((qtn, i) =>
              <FaqCardComponent
                key = { i }
                title = { qtn && qtn.title }
                onClick = { () => setSelectedFaqQuestion(qtn) } />
            )
          :
            <div className = { 'faqs-loader' }>
              <center><h1>No Category Found</h1></center>
            </div>
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
