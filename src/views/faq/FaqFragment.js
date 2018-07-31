import React from 'react'
import { Switch, Route, createBrowserHistory } from 'react-router-dom'
import PropTypes from 'prop-types'

import ConnectView from '../../utils/ConnectView'
import Presenter from './presenter/FaqPresenter'
import BaseMVPView from '../common/base/BaseMVPView'

import FaqCardComponent from './components/FaqCardComponent/FaqCardComponent'
import FaqModal from './modals/FaqModal'

import FaqListFragment from './fragments/FaqListFragment'
import FaqCategoryFragment from './fragments/FaqCategoryFragment'

import './styles/faq.css'

class FaqFragment extends BaseMVPView {
  constructor (props) {
    super(props)
    this.state = {
        faqs: [],
        categoryId: '',
        categoryName: '',
        categoryPath: '',
        selectedFaqCategory: null,
        selectedQuestion: null,
        showFaqModal : false,
        faqDetail: null,
        imageResponse: null,
        isCategoryLoading : true
    }

    this.setSelectedFaqCategory = this.setSelectedFaqCategory.bind(this)
    this.setSelectedFaqQuestion = this.setSelectedFaqQuestion.bind(this)
  }

  componentDidMount () {
    this.presenter.getFaqs(this.state.faqsList)
    this.props.setSelectedNavigation(2)
  }

  /**
  * set clicked faq category
  * props: FaqCategoryFragment
  */
  setSelectedFaqCategory (selectedFaqCategory) {
    this.setPathCategory(selectedFaqCategory.id, selectedFaqCategory.category)
    this.setState({ selectedFaqCategory, categoryId: selectedFaqCategory.id })
    this.props.history.push(`/faqs/${  selectedFaqCategory.category}`)
  }

  /**
  * set clicked question/faq
  * props: FaqListFragment
  */
  setSelectedFaqQuestion (selectedQuestion) {
    this.setState({ showFaqModal : true, selectedQuestion })
    this.presenter.getFaqDetails(selectedQuestion && selectedQuestion.id)
  }

  /* implementations */

  showFaqDetails (faqDetail) {
    this.setState({ faqDetail })
  }

  showFaqs (faqs) {
    this.setState({ faqs, isCategoryLoading : false })
  }

  setPathCategory(id, category) {
    if(id===2) {
      this.setState({ categoryName: category, categoryPath: 'medical' })
    }
    else if (id===3) {
      this.setState({ categoryName: category, categoryPath: 'education' })
    }
    else if (id===5) {
      this.setState({ categoryName: category, categoryPath: 'loans' })
    }
    else if (id===6) {
      this.setState({ categoryName: category, categoryPath: 'loans' })
    }
  }

  onClick() {
    this.props.history.push(`/mybenefits/benefits/${this.state.categoryPath}`)
  }

  render () {
    const { history } = this.props
    const {
      faqs,
      categoryId,
      categoryName,
      categoryPath,
      selectedFaqCategory,
      selectedQuestion,
      showFaqModal,
      faqDetail,
      isCategoryLoading,
      imageResponse
    } = this.state

    return (
      <div>
        <Switch>
          <Route path = '/faqs/:id' render = { props =>
            <FaqListFragment
              selectedFaqCategory={ selectedFaqCategory }
              setSelectedFaqQuestion={ this.setSelectedFaqQuestion }
              { ...props } /> }/>
          <Route exact path = '/faqs' render = { props =>
            <FaqCategoryFragment
              setSelectedFaqCategory={ this.setSelectedFaqCategory }
              faqCategories = { faqs }
              imageResponse={ imageResponse }
              isLoading = { isCategoryLoading }
              { ...props } /> } />
        </Switch>
        {
          showFaqModal &&
          <FaqModal
            categoryId = { categoryId }
            categoryName = { categoryName }
            categoryPath = { categoryPath }
            title = { faqDetail && faqDetail.title }
            details = { faqDetail && faqDetail.details }
            onClick = { () => this.onClick() }
            onClose = { () => this.setState({ showFaqModal : false, faqDetail: null }) } />
        }
      </div>
    )
  }
}

FaqFragment.propTypes = {
  setSelectedNavigation: PropTypes.func,
}

export default ConnectView(FaqFragment, Presenter)
