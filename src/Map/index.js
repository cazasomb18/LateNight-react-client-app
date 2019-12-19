import React, { Component } from 'react';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import current from '../pngs/location.png';
import food from '../pngs/coloredUtensils.png';

require("dotenv").config();



const styles = {

  map: {
    width: '75%',
    height: '500px',
    margin: '0 auto',
    marginTop: '100px',
    border: '3px solid #FF9E00',
    paddingVertical: '10px',
    paddingHorizontal: '10px',
    borderRadius: '3px'
  }

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
      selectedPlace: {}
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

  onClick = (marker, e) => {
    this.setState({
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

      <div>
        <Map 
          google={this.props.google}
          style={styles.map}
          center={{
            lat: this.state.lat,
            lng: this.state.lng
          }}
          defaultOptions={{
            styles: styles.map
          }}
          zoom={14}
          onClick={this.mapClicked}
          >
            <Marker
              name={'You are Here!'}
              position={{
                lat: this.props.latitude,
                lng: this.props.longitude
              }}
              icon={{
                url: current,
                scaledSize: new this.props.google.maps.Size(50,50)
              }} 
              onClick={this.onClick}
            />


            {
              this.props.restaurants.map((info, i) => (

              <Marker
                name={info.name}
                address={info.vicinity}
                icon={{
                  url: food,
                  scaledSize: new this.props.google.maps.Size(25,25)
                }} 
                style={{
                  color: '#FF6A00'
                }}
                openNow={info.opening_hours}
                position={{lat: info.geometry.location.lat, 
                           lng: info.geometry.location.lng
                         }}
                key={i}
                onClick={this.onMarkerClick}
              />
              ))
            }

            <InfoWindow
              marker={this.state.activeMarker}
              visible={this.state.showingInfoWindow}
              onClose={this.onClose}
            >
             {this.state.showingInfoWindow ?
              <div className="info-window">
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