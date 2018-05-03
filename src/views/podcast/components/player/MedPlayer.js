import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Media, Player, controls } from 'react-media-player'
const { PlayPause, MuteUnmute, CurrentTime, Duration, Fullscreen,  SeekBar, Volume } = controls

 
class MedPlayer extends Component {
  render() {
    return (
      <Media>
        <div className="media">
          <div className="media-player">
            <Player src="http://bitashop.org/Bita6/04.96/UK%20Top%2040%20Singles%20Chart/UK%20Top%2040%20Singles%20Chart/11.%20Ed%20Sheeran%20-%20Shape%20Of%20You.mp3"/>
          </div>
          <div className="media-controls">
            <PlayPause/>
            <CurrentTime/>
            <Duration/>
            <SeekBar/> 
            <MuteUnmute/>   
            <Volume/>
            <Fullscreen/>
          </div>
        </div>
      </Media>
    )
  }
}

export default (MedPlayer)