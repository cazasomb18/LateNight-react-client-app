import React, { Component } from 'react';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import ReactDOM from 'react-dom';

const style = {
  width: '75%',
  height: '75%'
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
    this.mapData();
    this.setState({
      lat: this.props.latitude,
      lng: this.props.longitude,
      geometry: [{...this.props.restaurants}]
    })
    this.mapData();
    console.log('this.state in MAP CDM: ', this.state);
    console.log('this.props in MAP CDM: ', this.props);
    console.log('props.google.maps in MAP CDM: ', this.props.google.maps);
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
    console.log(parsedMapData);
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
        activeMarker: null
      });
    }
  }
// mapData = () => {
//   console.log('this is all the data: ', this.state.geometry);
//     // return(
//       this.state.geometry.map((info, i) => {
//         console.log('this is the info: ', info, i);
//         // return (info, i)
//       })
//     // )
//   }
  mapData = () => {
    // console.log('this is all the data: ', this.state.geometry[0][0]);
      // return(
        this.state.geometry.map((info, i) => {
          console.log('this is the info: ', info, i);
        // return (info, i)
      })

  }
  render(){
    // console.log('PROPS IN MAP RENDER(): ', this.props);
    // console.log('STATE IN MAP RENDER():', this.state);
    // console.log('THIS.PROPS.GOOGLE.MAPS render(): ', this.props.google.maps);
    // console.log('this.state.geometry[0] in MAP CDM: ', this.state.geometry[0]);
    // console.log (this.state.geometry[0].geometry)
    // this.mapData();
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

          <Marker 
            position={{
              lat: '',
              lng: ''
            }}
            onClick={this.onMarkerClick} 
            name={'Current Location'} 
          />

          <InfoWindow
            marker={this.state.activeMarker}
            visible={this.state.showingInfoWindow}
            onClose={this.onClose}
          >
            <h4>????? YOU ARE HERE ????</h4>
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


            // {this.state.selectedPlace.name}