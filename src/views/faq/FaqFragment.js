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
        selectedFaqCategory: null,
        selectedQuestion: null,
        showFaqModal : false,
        faqDetail: null,
        imageResponse: null,
        isCategoryLoading : true,
    }

    this.setSelectedFaqCategory = this.setSelectedFaqCategory.bind(this)
    this.setSelectedFaqQuestion = this.setSelectedFaqQuestion.bind(this)
  }

  componentDidMount () {
    this.presenter.getFaqs(this.state.faqsList)
    this.props.setSelectedNavigation(2)
  }

  componentWillReceiveProps (nextProps, nextState) {

  }

  /**
  * set clicked faq category
  * props: FaqCategoryFragment
  */
  setSelectedFaqCategory (selectedFaqCategory) {
    this.setState({ selectedFaqCategory })
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
    faqs.map((faq, key) => this.presenter.getFaqsImage(faq.icon))
    this.setState({ faqs, isCategoryLoading: false })
  }

  showedImage (imageResponse) {
    this.setState({imageResponse})
  }

  render () {
    const { history } = this.props
    const {
      faqs,
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
            title = { faqDetail && faqDetail.title }
            details = { faqDetail && faqDetail.details }
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
