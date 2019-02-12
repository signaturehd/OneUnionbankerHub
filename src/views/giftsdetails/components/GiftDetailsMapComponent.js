import React, { Component } from 'react'
import { format } from '../../../utils/numberUtils'
import { Map, TileLayer, Marker, Popup } from 'react-leaflet'

class GiftDetailsMapComponent extends Component {
  constructor(props) {
    super(props)
    this.state = {
      markers: [[51.505, -0.09]]
   }
 }
  addMarker = (e) => {
    const {markers} = this.state
    markers.push(e.latlng)
    this.setState({markers})
  }

  render () {
    return (
      <div id = { 'giftdetails-location-cover' }>
        <div className = { 'giftdetails-locations' }>
          <div id = { 'giftdetails-map' }>
            <div style= {{
            	height : '50%',
              width : '50%',
            }}>
              <Map
                center={[51.505, -0.09]}
                onClick={this.addMarker}
                zoom={13}
                >
                <TileLayer
                  attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                  url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
                />
                {this.state.markers.map((position, idx) =>
                  <Marker key={`marker-${idx}`} position={position}>
                  <Popup>
                    <span>A pretty CSS3 popup. <br/> Easily customizable.</span>
                  </Popup>
                </Marker>
                )}
              </Map>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default GiftDetailsMapComponent
