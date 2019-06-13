import React, { Component } from 'react';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import ReactDOM from 'react-dom';

const style = {
  width: '50%',
  height: '50%'
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
    console.log('this.state in MAP CDM: ', this.state);
    console.log('this.props in MAP CDM: ', this.props);
    console.log('props.google.maps in MAP CDM: ', this.props.google.maps);
  }
  // getMapData = async (e) => {
  //   const mapData = await fetch(process.env.REACT_APP_GOOGLE_MAPS_URL + process.env.REACT_APP_API_KEY, {
  //     method: 'GET',
  //     credentials: 'include',
  //     headers: {
  //       'Content-Type': 'application.json'
  //     }
  //   })
  //   const parsedMapData = await mapData.json();
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
  render(){
    console.log('PROPS IN MAP RENDER(): ', this.props);
    console.log('STATE IN MAP RENDER():', this.state);
    console.log('THIS.PROPS.GOOGLE.MAPS render(): ', this.props.google.maps);
    console.log('this.state.geometry in MAP CDM: ', this.state.geometry);
    const indexofLoc = this.state.geometry[0];
    console.log(indexofLoc);
    const geometryLocation = indexofLoc.map((i, location) => {
    return(

      <div className="MapContainer">  
        <Map 
          google={this.props.google}
          style={style}
          center={{
            lat: this.state.lat,
            lng: this.state.lng
          }}
          zoom={15}
          onClick={this.mapClicked}>

          <Marker
            
            onClick={this.onMarkerClick} 
            name={'Current Location'}
          />

          <InfoWindow
            marker={this.state.activeMarker}
            visible={this.state.showingInfoWindow}
            onClose={this.onClose}
          >

            <div>
              <h4>{this.state.selectedPlace.name}</h4>
            </div>

          </InfoWindow>
        </Map>
      </div>

    );

  });
  }
};

export default GoogleApiWrapper(
  (props) => ({
  apiKey: (process.env.REACT_APP_API_KEY)
  }
))(MapContainer);








        // <div className="form">
        //   <form className="form"onSubmit={this.getMapData}>
        //   <input className="field" type="submit" name="get map data"/>
        //   </form>
        // </div>