import React, { Component } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Header from './Header';
import AppTitle from './AppTitle';
import LateRestaurantsList from './LateRestaurantsList';
import Dashboard from './Dashboard';
import MapContainer from './Map';
// import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';

class App extends Component {
  constructor(props){
    super(props);
    this.state = ({
      loggedIn: false,
      isRegistered: false,
      userName: '',
      restaurants: [this.props.restaurants],
      comments: [],
      showList: false,
      showDash: false,
      lat: '',
      lng: ''
    })
  }

  setUserInfo = (loginRegisterResponse) => {
    this.setState({
      userName: loginRegisterResponse.data.userName,
      loggedIn: true,
      showList: true
    })
  }

  showDashAndHideList = () => {
    // console.log("showDashAndHideList");
    this.setState({
      showDash: true,
      showList: false
    })
  }

  showListAndHideDash = () => {
    // console.log("showListAndHideDash");
    this.setState({
      showDash: false,
      showList: true
    })
  }

  componentDidMount () {

    navigator.geolocation.getCurrentPosition((data) => {       
       this.setState({
          lat: data.coords.latitude,
          lng: data.coords.longitude
       })
    })
  }
  logOutReactApp = () => {
    this.setState({
      loggedIn: false,
      userName: '',
      restaurants: [],
      comments: [],
      showDash: false,
      showList: false
    })
  }
  handleChange = (e) => {
    e.preventDefault();
    this.setState({
      [e.currentTarget.name]: e.currentTarget.value 
    })
  }
  render(){
    console.log('STATE IN APP RENDER(): ', this.state);
    console.log('PROPS IN APP RENDER(): ', this.props);
    return (
      <main>
        <div>
          { this.state.lat === '' ? null : <h6 className="coordinates" > {this.state.lat + ", " + this.state.lng} </h6> }
          <AppTitle 
            userName={this.state.userName}/>
          <Header 
            setUserInfo={this.setUserInfo} 
            loggedIn={this.state.loggedIn} 
            logOutReactApp={this.logOutReactApp}/>
        {
          this.state.loggedIn ?


          <div>
              <Dashboard 
                userName={this.state.userName} 
                latitude={this.state.lat}
                longitude={this.state.lng}
                showDashAndHideList={this.showDashAndHideList}
                showListAndHideDash={this.showListAndHideDash}
              />

              <LateRestaurantsList 
                userName={this.state.userName} 
                latitude={this.state.lat} 
                longitude={this.state.lng}
                showListAndHideDash={this.showListAndHideDash}
                showDashAndHideList={this.showDashAndHideList}
              />

          </div>
          : 
          <div>
            <h4 className="subTitle">
              Please Login
            </h4>
          </div>
        }


        </div>
      </main>
    );
  }
}

export default App;