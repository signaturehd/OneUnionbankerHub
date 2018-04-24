import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Presenter from './presenter/PodcastPresenter'
import BaseMVPView from '../common/base/BaseMVPView'
import ConnectPartial from '../../utils/ConnectPartial'

class PodCastView extends BaseMVPView{

  constructor (props) {
    super(props)
    this.state = {
      podcasts : [],
      showRating : false,
      showPodcast : false
    }
  }

  componentDidMount () {
      this.presenter.getPodcast()
  }

  showPodcast (podcasts) {
    this.setState({ podcasts })
  }


  render () {
    const { podcasts } = this.state
    return (
      <div>
      { super.render() }
        <div>
          <div className = { 'page-header-buttons' }>
          </div>
        </div>
        <h1>Podcasts</h1>
        <div className = { 'tabs-container' }>
          <BookTabsComponent  books={ books } />
        </div>
      </div>
    )
  }
  }

  export default ConnectPartial(PodCastView, Presenter)
