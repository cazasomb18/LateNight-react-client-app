import React, { Component } from 'react';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import ReactDOM from 'react-dom';

const style = {
  width: '75%',
  height: '75%'
}
const infoWindow = {
  card: {
    maxWidth: 200,
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

    // this.mapData();

  }
  getMapData = async (e) => {
    const mapData = await fetch(process.env.REACT_APP_GOOGLE_MAPS_URL + process.env.REACT_APP_API_KEY + this.onMarkerClick, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application.json'
      }
    })
    const parsedMapData = await mapData.json();
    // console.log(parsedMapData);
  }
  // showSearchResultsMarkers = (e) => {
  //   const resultsMarkers = this.state.geometry.map((index, directions) => {
  //     console.log(index);
  //     return(
  //         <Marker 
  //           position={{
  //             lat: index[0].geometry.location.lat,
  //             lng: index[0].geometry.location.lng
  //           }}
  //           onClick={this.onMarkerClick}
  //         />
  //       )
  //     }
  //   ) 
  // }
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

  // mapData = () => {
  //   console.log('this is all the data: ', this.props.restaurants);
  //      const markers = this.props.restaurants.map((info, i) => {
  //         // console.log('this is the info: ', info.geometry.location.lat, i);
  //         // console.log('this is the info: ', info.geometry.location.lng, i);
  //         return (           
  //           <Marker
  //             name={info.name}
  //             position={{lat: info.geometry.location.lat,lng: info.geometry.location.lng}}/>
  //         )
  //             // onClick={this.onMarkerClick}
  //     })
  //   )
  // }






  render(){

    return(
      <div className="MapContainer">  
        <Map 
          google={this.props.google}
          style={style}
          center={{
            lat: this.state.lat,
            lng: this.state.lng
          }}
          zoom={11}
          onClick={this.mapClicked}
          >
            <Marker
              position={{
                lat: this.props.latitude,
                lng: this.props.longitude
              }}
              onClick={this.onMarkerClick}
              name={'Current Location'}
            />
            {this.props.restaurants.map((info, i) => (
          
              <Marker
                name={info.name}
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
             {this.state.showingInfoWindow?
              <div>
                <h1>{this.state.activeMarker.name}</h1>
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