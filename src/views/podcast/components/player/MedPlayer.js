import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Media, Player, controls } from 'react-media-player'

const { PlayPause, MuteUnmute, CurrentTime, Duration, Fullscreen,  SeekBar, Volume } = controls
 
class MedPlayer extends Component {
  render() {
    return (
      <div>
      <Media className= {'player'}>
        <div className="media">
          <div className="media-player">
            <Player src="https://www.youtube.com/watch?v=IxD2NbXzgpQ"/>
          </div>
          <div className="media-controls">
            <PlayPause className={'plays-button'}/>
            <CurrentTime/>
            <Duration/>
            <SeekBar/> 
            <MuteUnmute/>   
            <Volume/>
            <Fullscreen/>
          </div>
        </div>
      </Media>
      </div>
    )
  }
}

export default (MedPlayer)