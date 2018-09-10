import React, { Component } from 'react'
import PropTypes from 'prop-types'

import FaqCardComponent from '../components/FaqCardComponent'
import './styles/faqsFragment.css'

import { GenericInput } from '../../../ub-components'

class FaqListFragment extends Component {
  constructor (props) {
    super(props)

    this.state = {
      searchString: '',
    }
    this.updateSearch = this.updateSearch.bind(this)
  }

  search (searchString) {
    this.setState({ searchString })
  }

  updateSearch (e) {
    this.setState({ searchString: e.target.value.substr(0 , 20) })
  }

  render () {
    const { searchString } = this.state
    const {
      selectedFaqCategory,
      setSelectedFaqQuestion,
      history,
      imageResponse
    } = this.props
    const setSelectedFaqsCategory  =
      selectedFaqCategory && selectedFaqCategory.question
    const search = this.state.searchString.trim().toLowerCase()

    let searchQuestions = setSelectedFaqsCategory

    if (search.length > 0) {
        searchQuestions = setSelectedFaqsCategory.filter(
          setSelectedFaqsCategory =>
            setSelectedFaqsCategory.title.toLowerCase().match(search))
    }
    return (
      <div className = {'container'}>
        <div className = { 'faqlist-grid-header' }>
          <div className = { 'text-align-left' } >
            <i className = { 'back-arrow' } onClick = { () =>
                history.push('/faqs') }>
            </i>
            <h1 className = { 'title-view' }>
              { selectedFaqCategory && selectedFaqCategory.category }
            </h1>
          </div>
          <div></div>
          <GenericInput
            className = { 'faqsSearchBar' }
            refCallback = { 'search' }
            type = { 'text' }
            hint = { 'Search FAQs' }
            value = { searchString }
            onChange = { this.updateSearch } />
        </div>
        <div className = {'faqs-container'}>
        {
          searchQuestions ?
            searchQuestions.map((qtn, i) =>
              <FaqCardComponent
                key = { i }
                imageResponse = { imageResponse }
                title = { qtn && qtn.title }
                subtitle = { qtn && qtn.subtitle }
                icon = { qtn && qtn.icon }
                onClick = { () => setSelectedFaqQuestion(qtn) } />
            )          :
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
