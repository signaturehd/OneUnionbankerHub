import React, { Component } from 'react'
import PropTypes from 'prop-types'

import FaqCardComponent from '../components/FaqCardComponent'

import { CircularLoader, GenericInput  } from '../../../ub-components'

import './styles/faqsFragment.css'

class FaqCategoryFragment extends Component {
  constructor (props) {
    super(props)

    this.state = {
      searchString: '',
    }
    this.updateSearch = this.updateSearch.bind(this)
  }


  updateSearch (e) {
    this.setState({ searchString: e.target.value.substr(0 , 20) })
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
        <div className = { 'faqlist-grid-header' }>
          <div className = { 'text-align-left' } >
            <h1 className = { 'title-view' }>FAQ&#39;s</h1>
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
         {
           !isLoading ?
              searchCategories && searchCategories.length > 0 ?
                <div className = { 'faqs-container' }>
                  {
                    searchCategories.map((faq, i) =>
                      <FaqCardComponent
                        subtitle = { faq.subtitle }
                        key = { i }
                        icon = { faq && faq.icon }
                        title = { faq && faq.category }
                        onClick = { () => setSelectedFaqCategory(faq) } />
                      )
                  }
                </div>              :
              <div>
                <center><h1>No image found</h1></center>
              </div>            :
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
