import React, { Component } from 'react';
import GoogleMapsReact from 'google-maps-react';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';

const style = {
  width: '35%',
  height: '35%'
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
  componentDidMount(){
    console.log('this.state in MAP CDM: ', this.state);
    console.log('this.props in MAP CDM: ', this.props);
  }
  getMapData = async (e) => {
    const mapData = await fetch(process.env.REACT_APP_GOOGLE_MAPS_URL + process.env.REACT_APP_API_KEY, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application.json()'
      }

    })
    const parsedMapData = await mapData.json();
  }
  render(){
    console.log(this.parsedMapData);
    return(
    <div>
      <Map
        google={this.parsedMapData}
        style={style}
        center={{
          lat: 41.87,
          lng: -87.62
        }}
        zoom={11}
        onClick={this.onMapClicked}>

        <Marker onClick={this.onMarkerClick} name={'Current Location'}/>
      </Map>
    </div>
      );
  }
}

// export class MapContainer extends React.Component {}

export default GoogleApiWrapper({
  apiKey: (process.env.REACT_APP_API_KEY)
})(MapContainer);