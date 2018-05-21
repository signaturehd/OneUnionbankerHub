import React, { Component } from 'react'
import PropTypes from 'prop-types'

import FaqCardComponent from '../components/FaqCardComponent'

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
    const { faqCategories, setSelectedFaqCategory } = this.props

    return (
      <div className = { 'container' }>
        <h1 className = { 'title-view' }>FAQ&#39;s</h1>
          <input type = 'text'
                 className = 'faqsSearchBar'
                 placeholder = 'Search FAQs'
                 value = { this.state.searchString }
                 onChange = { e => this.search(e.target.value) } />
        <div className = { 'card-container' }>
        {
        faqCategories && faqCategories.map((faq, i) =>
          <FaqCardComponent
            key = { i }
            icon = { faq.icon }
            title = { faq.category }
            onClick = { () => setSelectedFaqCategory(faq) } />
          )
        }
        </div>
      </div>
    )
  }
}

FaqCategoryFragment.propTypes = {
  faqCategories: PropTypes.array,
  setSelectedFaqCategory: PropTypes.func,
}

export default FaqCategoryFragment
