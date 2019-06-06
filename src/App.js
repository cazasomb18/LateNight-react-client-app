import React, { Component } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Header from './Header';
import AppTitle from './AppTitle';
import LateRestaurantsList from './LateRestaurantsList';
import Dashboard from './Dashboard';

class App extends Component {
  constructor(props){
    console.log('APP CONSTRUCTOR',);
    super(props);
    this.state = ({
      loggedIn: false,
      isRegistered: false,
      userName: '',
      restaurants: [],
      comments: [],
      showList: false,
      showDash: false,
      lat: '',
      lng: ''
    })
  }

  setUserInfo = (loginRegisterResponse) => {
    console.log(loginRegisterResponse);
    this.setState({
      userName: loginRegisterResponse.data.userName,
      loggedIn: true,
      showList: true
    })
  }

  componentDidMount () {
    console.log('cdm: in App');

    navigator.geolocation.getCurrentPosition((data) => {
       const latLong = data
       console.log(latLong);   
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
    console.log("APP STATE IN RENDER(): ", this.state);
    return (
      <main>
        <div>
          { this.state.lat == '' ? null : <p> {this.state.lat + ", " + this.state.lng} </p> }
          <AppTitle userName={this.state.userName}/>
          <Header setUserInfo={this.setUserInfo} loggedIn={this.state.loggedIn} logOutReactApp={this.logOutReactApp}/>
      { this.state.loggedIn ?
        <div>
          <Dashboard 
            userName={this.state.userName} 
            latitude={this.state.lat}
            longitude={this.state.lng}
          />
          <LateRestaurantsList 
            userName={this.state.userName} 
            latitude={this.state.lat} 
            longitude={this.state.lng}
          />
        </div>
        :
        <div>
          <h3>PLEASE LOGIN</h3>
        </div>
      }
        </div>
      </main>
    );
  }
}

export default App;
