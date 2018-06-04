import React, { Component } from 'react'
import PropTypes from 'prop-types'

import FaqCardComponent from '../components/FaqCardComponent'

import { CircularLoader } from '../../../ub-components'

import './styles/faqsFragment.css'

class FaqCategoryFragment extends Component {
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
      faqCategories,
      setSelectedFaqCategory,
      isLoading,
      imageResponse,
    } = this.props

    let searchCategories = faqCategories
    const search = this.state.searchString.trim().toLowerCase()
    if (search.length > 0) {
        searchCategories = faqCategories.filter(faqCategories =>
          faqCategories.category.toLowerCase().match(search))
    }

    return (
      <div className = { 'container' }>
        <h1 className = { 'title-view' }>FAQ&#39;s</h1>
          <input type = 'text'
                 className = 'faqsSearchBar'
                 placeholder = 'Search FAQs'
                 value = { this.state.searchString }
                 onChange = { e => this.search(e.target.value) } />
         {
           !isLoading ?
              searchCategories && searchCategories.length > 0 ?
                <div className = { 'card-container' }>
                  {
                    searchCategories.map((faq, i) =>
                      <FaqCardComponent
                        key = { i }
                        icon = { faq.icon }
                        title = { faq.category }
                        onClick = { () => setSelectedFaqCategory(faq) } />
                      )
                  }
                </div>
              :
              <div>
                <center><h1>No Category Found</h1></center>
              </div>
            :
            <div className = { 'faqs-loader' }>
              <center><CircularLoader show = {true} /></center>
            </div>
        }
      </div>
    )
  }
}

FaqCategoryFragment.propTypes = {
  faqCategories: PropTypes.array,
  setSelectedFaqCategory: PropTypes.func,
  isLoading: PropTypes.bool,
}

export default FaqCategoryFragment
