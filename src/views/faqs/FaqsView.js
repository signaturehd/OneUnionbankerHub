import React from 'react'
import { Switch, Route } from 'react-router-dom'


import ConnectView from '../../utils/ConnectView'
import NewsInteractor from '../../domain/interactor/news/NewsInteractor'

import Presenter from './presenter/FaqsPresenter'
import BaseMVPView from '../common/base/BaseMVPView'
import ConnectPartial from '../../utils/ConnectPartial'

import { GenericCard } from '../../ub-components/Cards'



class FaqsView extends BaseMVPView {
    constructor (props) {
        super(props)
        this.state = {
            showFaqs: []
        }
    }

    componentDidMount () {
        this.presenter.getFaqs()
    }

    showFaqs (faq) {
        this.setState({ showFaqs:faq })
    }

    render () {
        const { showFaqs } = this.state

        return (
            <div className = {'library-container'}>
                {
                    showFaqs.map((faq, key) => (
                        <GenericCard
                            title = { faq.title }
                            description = { faq.author }
                        />
                    ))
                }
            </div>
        )
    }
}

export default ConnectPartial(FaqsView, Presenter)


