import React, { Component } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Header from './Header';
import AppTitle from './AppTitle';
import LateRestaurantsList from './LateRestaurantsList';
import Dashboard from './Dashboard';
import Spinner from 'react-bootstrap/Spinner';

class App extends Component {
  constructor(props){
    super(props);
    this.state = ({
      loggedIn: false,
      isRegistered: false,
      userName: '',
      showList: false,
      showDash: false,
      lat: '',
      lng: ''
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

  setUserInfo = (loginRegisterResponse) => {
    this.setState({
      userName: loginRegisterResponse.data.userName,
      loggedIn: true,
      showList: true
    })
  }

  showDashAndHideList = (e) => {
    console.log("showDashAndHideList");
    if (this.state.showDash === false && this.state.showList === true ) {  
      this.setState({
        showDash: true,
        showList: false
      })
    }
  }

  showListAndHideDash = (e) => {
    console.log("showListAndHideDash");
    if (this.state.showList === false && this.state.showDash === true) {
      this.setState({
        showList: true,
        showDash: false
      })
    }
  }

  logOutReactApp = () => {
    this.setState({
      loggedIn: false,
      userName: '',
      // comments: [],
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
          { this.state.lat === '' || this.state.lng === '' ? 
            <div id="spinnerContainer">
              <h3 className="spinnerText" >Locating Your GPS Position...</h3>
              <Spinner className="spinner" animation="border" variant="light" role="status">
                <span className="sr-only">Locating GPS Position...</span>
              </Spinner>
            </div>
              : 
            null
          }
          <AppTitle userName={this.state.userName}/>

          <Header 
            setUserInfo={this.setUserInfo}
            loggedIn={this.state.loggedIn} 
            logOutReactApp={this.logOutReactApp}
          />

        {
          this.state.loggedIn ?


        <div>

        {
          this.state.showDash ? 

            <Dashboard 
              userName={this.state.userName}
              latitude={this.state.lat}
              longitude={this.state.lng}
              showDashAndHideList={this.showDashAndHideList}
              showListAndHideDash={this.showListAndHideDash}
            />

              :

            <LateRestaurantsList 
              userName={this.state.userName} 
              latitude={this.state.lat} 
              longitude={this.state.lng}
              showListAndHideDash={this.showListAndHideDash}
              showDashAndHideList={this.showDashAndHideList}
            />
          
        }
        </div>
          : 
          <div>
            <h4 className="subTitle bg-transparent">
              Please Login
            </h4>
          </div>
        }

        </div>
      </main>
    )
  }
}

export default App;