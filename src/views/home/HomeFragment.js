import React from 'react'
import PropTypes from 'prop-types'
import ConnectView from '../../utils/ConnectView'

import Presenter from './presenter/HomePresenter'
import BaseMVPView from '../common/base/BaseMVPView'
import ConnectPartial from '../../utils/ConnectPartial'

import {
  CircularLoader,
  GenericInput,
  Line,
  Card,
  GenericButton,
  SkeletalLoader,
} from '../../ub-components'

import HomeGreetingsComponent from './components/HomeGreetingsComponent'

//News Fragment
import NewsFragment from '../news/NewsFragment'
//Phenom Fragment
import Phenom from '../phenom/PhenomFragment'

import './styles/homeStyle.css'

class HomeFragment extends BaseMVPView {
  constructor (props) {
    super(props)
    this.state = {
      greetingsMessage : '',
      employeeName  : '',
    }
  }

  componentDidMount () {
    // this.presenter.getCheckGreetingsStatus()
    this.presenter.getProfile()
    this.props.setSelectedNavigation(0)
  }

  showGreetingsMessage (greetingsMessage) {
    this.setState({ greetingsMessage })
  }

  showProfileName (employeeName ) {
    this.setState({ employeeName })
  }

  render () {
    const {
      greetingsMessage,
      employeeName
    } = this.state

    return (
      <div className = { 'home-fragment-view' }>
        <div></div>
        <div className = { 'home-grid-fragment' }>
          <div>
            <HomeGreetingsComponent
              greetingsMessage = { greetingsMessage }
              employeeName  = { employeeName  }
            />
            <br/>
            <br/>
            <br/>
            <br/>
          </div>
          <div>
            <NewsFragment />
          </div>
          <div className = { 'container' }>
            <br/>
            <br/>
            <h2 className={ 'header-margin-default text-align-left news-header' }> Phenom Prime </h2>
            <h2>We &#39;ve got these special deals, Just for U!</h2>
            <br/>
            {
              // <div class="news-slider__arrows">
              //   <button class="news-slider__arrow news-slider-prev">
              //   <span class="icon-font">
              //     <svg class="icon icon-arrow-left"><use xlinkHref="#icon-arrow-left"></use></svg>
              //   </span>
              //   </button>
              //   <button class="news-slider__arrow news-slider-next">
              //     <span class="icon-font">
              //       <svg class="icon icon-arrow-right"><use xlinkHref="#icon-arrow-right"></use></svg>
              //     </span>
              //   </button>
              // </div>
              // <svg hidden="hidden">
              //   <defs>
              //     <symbol id="icon-arrow-left" viewBox="0 0 32 32">
              //       <title>arrow-left</title>
              //       <path d="M0.704 17.696l9.856 9.856c0.896 0.896 2.432 0.896 3.328 0s0.896-2.432 0-3.328l-5.792-5.856h21.568c1.312 0 2.368-1.056 2.368-2.368s-1.056-2.368-2.368-2.368h-21.568l5.824-5.824c0.896-0.896 0.896-2.432 0-3.328-0.48-0.48-1.088-0.704-1.696-0.704s-1.216 0.224-1.696 0.704l-9.824 9.824c-0.448 0.448-0.704 1.056-0.704 1.696s0.224 1.248 0.704 1.696z"></path>
              //     </symbol>
              //     <symbol id="icon-arrow-right" viewBox="0 0 32 32">
              //       <title>arrow-right</title>
              //       <path d="M31.296 14.336l-9.888-9.888c-0.896-0.896-2.432-0.896-3.328 0s-0.896 2.432 0 3.328l5.824 5.856h-21.536c-1.312 0-2.368 1.056-2.368 2.368s1.056 2.368 2.368 2.368h21.568l-5.856 5.824c-0.896 0.896-0.896 2.432 0 3.328 0.48 0.48 1.088 0.704 1.696 0.704s1.216-0.224 1.696-0.704l9.824-9.824c0.448-0.448 0.704-1.056 0.704-1.696s-0.224-1.248-0.704-1.664z"></path>
              //     </symbol>
              //   </defs>
              // </svg>
            }

          </div>
        </div>
        <div></div>
      </div>
    )
  }
}

HomeFragment.propTypes = {
  setSelectedNavigation: PropTypes.func,
}

export default ConnectView(HomeFragment, Presenter)
