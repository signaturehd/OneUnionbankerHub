import React from 'react'
import { Switch, Route } from 'react-router-dom'
import PropTypes from 'prop-types'
import BaseMVPView from '../common/base/BaseMVPView'
import Presenter from './presenter/PodcastPresenter'
import './styles/styles.css'
import ConnectPartial from '../../utils/ConnectPartial'
import { GenericButton } from '../../ub-components/UButton'
import { Cards } from '../../ub-components'
import PodcastListView from './fragments/podcastlist/PodcastListView'
import PodcastPlaylist from './fragments/playlist/PodcastPlaylist'

class PodcastView extends BaseMVPView {
  constructor (props) {
    super(props)
    }
  render () {
    const { onClick, text, path, icon, onOptionsLink, history } = this.props
    const podcastOptions =
    [
      { id: 0 , title: 'My PlayList', path: '/podcast/playlist' },
      { id: 1 , title: 'Podcasts', path: '/podcast/podcastlist' },

    ]
    const style = {
          _pageheader : {
            height: 'auto',
            color: 'black',
            width: 'auto',
            padding: '1%',
            background: '#fefefe',
            boxShadow: '0 0 4px 0 rgba(0,0,0,0.20)',
          }
        }


    return (
      <div>
        <div style = { style._pageheader }>
          <div className = { 'page-header-buttons' }>
          </div>
        </div>
        <h1> Podcasts</h1>
        <div className = { '_podcast-container' }>
          {
            podcastOptions.map((value, idx) => (
              <Cards className = { 'options-1' } >
                <div
                  className = { 'option-cards' }
                  text = { value.title }
                  key = { idx }
                  onClick = { () => onOptionsLink(history.push(value.path)) } >
                  <span> { value.title } </span></div>
              </Cards>
            ))
          }
          </div>
          <div className = { '_podcast-container' }>
            <Switch>
              <Route path = '/podcast/playlist' render = { props => <PodcastPlaylist parent = { this } />}/>
              <Route path = '/podcast/podcastlist' render = { props => <PodcastListView parent = { this } />}/>

           </Switch>
         </div>
      </div>
    )
  }
}
PodcastView.propTypes = {
  text : PropTypes.string,
  icon : PropTypes.string,
  path : PropTypes.string,
  onClick : PropTypes.func,
}

export default ConnectPartial(PodcastView, Presenter)
