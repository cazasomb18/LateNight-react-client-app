import React, { Component } from 'react';
import GoogleMapsReact from 'google-maps-react';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';

const style = {
  width: '25%',
  height: '25%'
}

class MapContainer extends Component {
  constructor(props){
    super()
    this.state=({
      lat: '',
      lng: '',
      geometry: []
    })
  }
  render(){
    return(
    <div>
      <Map 
        google={this.props.google}
        style={style}
        center={{
          lat: 41.87,
          lng: -87.62
        }}
        zoom={11}
        onClick={this.onMapClicked}>

        <Marker onClick={this.onMarkerClick} name={'Current Location'}/>

        <InfoWindow onClose={this.onInfoWindowClose}>
          <div>
          </div>
        </InfoWindow>
      </Map>
    </div>
      );
  }
}

// export class MapContainer extends React.Component {}

export default GoogleApiWrapper({
  apiKey: (process.env.REACT_APP_API_KEY)
})(MapContainer);