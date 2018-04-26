import React, { Component } from 'react'
import PropTypes from 'prop-types'
class Player extends Component {
render(){
	return(
		<audio controls>
        <source src="http://bitashop.org/Bita6/04.96/UK%20Top%2040%20Singles%20Chart/UK%20Top%2040%20Singles%20Chart/11.%20Ed%20Sheeran%20-%20Shape%20Of%20You.mp3" type="audio/mpeg" />
        Your browser does not support the audio element.
      	</audio>
		)

}

}
export default (Player)