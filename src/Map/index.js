import React, { Component } from 'react';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';

const styles = require('../GoogleMapStyles.json');
require("dotenv").config();



const style = {
  width: '75%',
  height: '480px'
}

class MapContainer extends Component {
  constructor(props){
    super(props)
    this.state = {
      lat: '',
      lng: '',
      geometry: [],
      showingInfoWindow: false,
      activeMarker: {},
      selectedPlace: {},
      dataIndex: {}
    }
  }
  componentDidMount(){
    this.setState({
      lat: this.props.latitude,
      lng: this.props.longitude,
      geometry: [{...this.props.restaurants}]
    })
  }
  onMarkerClick = (props, marker, e) => {
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true

    })
  }
  onClose = props => {
    if (this.state.showingInfoWindow){
        this.setState({
          showingInfoWindow: false,
          activeMarker: {}
        });
      }
  }
  render(){
    return(
      <div id="mapContainer">    
        <Map 
          id="mapChild"
          google={this.props.google}
          style={style}
          center={{
            lat: this.state.lat,
            lng: this.state.lng
          }}
          defaultOptions={{
            styles: styles
          }}
          zoom={13}
          onClick={this.mapClicked}
          >
            <Marker
              name={'You are Here!'}
              position={{
                lat: this.props.latitude,
                lng: this.props.longitude
              }}
            />
            {this.props.restaurants.map((info, i) => (

              <Marker
                name={info.name}
                address={info.vicinity}
                icon={info.icon}
                openNow={info.opening_hours}
                position={{lat: info.geometry.location.lat, 
                           lng: info.geometry.location.lng
                         }}
                key={i}
                onClick={this.onMarkerClick}
              />
            ))}
            <InfoWindow
              marker={this.state.activeMarker}
              visible={this.state.showingInfoWindow}
              onClose={this.onClose}
            >
             {this.state.showingInfoWindow ?
              <div>
                <h4>{this.state.activeMarker.name}</h4>
                <h6>{this.state.activeMarker.address}</h6>
                {this.state.activeMarker.openNow.open_now === true ? 
                  <h6>Open Now!!</h6> 
                  : 
                  <h6>Open Late!!</h6>
                }
              </div>
              :
              <div></div>}
            </InfoWindow>
        </Map>
      </div>
    )
  }
};

export default GoogleApiWrapper(
  (props) => ({
  apiKey: (process.env.REACT_APP_API_KEY)
  }
))(MapContainer);