import React, { Component } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Header from './Header';
import AppTitle from './AppTitle';
import LateRestaurantsList from './LateRestaurantsList';
import Dashboard from './Dashboard';

class App extends Component {
  constructor(props){
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
    this.setState({
      userName: loginRegisterResponse.data.userName,
      loggedIn: true,
      showList: true
    })
  }

  showDashAndHideList = () => {
    console.log("showDashAndHideList");
    this.setState({
      showDash: true,
      showList: false
    })
  }

  showListAndHideDash = () => {
    console.log("showDashAndHideList");
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
    return (
      <main>
        <div>
          { this.state.lat === '' ? null : <h6> {this.state.lat + ", " + this.state.lng} </h6> }
          <AppTitle 
            userName={this.state.userName}/>
          <Header 
            setUserInfo={this.setUserInfo} 
            loggedIn={this.state.loggedIn} 
            logOutReactApp={this.logOutReactApp}/>
        { 


          this.state.loggedIn ?

          <div>

            {
              this.state.showDash 
              ?
              <Dashboard 
                userName={this.state.userName} 
                latitude={this.state.lat}
                longitude={this.state.lng}
              />
              :
              null
            }

            {
              this.state.showList
              ?
              <LateRestaurantsList 
                userName={this.state.userName} 
                latitude={this.state.lat} 
                longitude={this.state.lng}
                showDashAndHideList={this.showDashAndHideList}
              />
              :
              null
            }
          </div>



          :
          <div>
            <h3>LateNight food is just a LOGIN away!</h3>
          </div>


        }
        </div>
      </main>
    );
  }
}

export default App;