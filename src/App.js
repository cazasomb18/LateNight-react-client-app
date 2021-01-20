import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Header from './Header';
import AppTitle from './AppTitle';
import LateRestaurantsList from './LateRestaurantsList';
import Dashboard from './Dashboard';
import Spinner from 'react-bootstrap/Spinner';

class App extends React.Component {
  constructor(props){
    super(props);
    this.renderPosition.bind(this);
    this.state = ({
      loggedIn: false,
      isRegistered: false,
      userName: '',
      showList: false,
      showDash: false,
      lat: null,
      lng: null,
      errorMessage: ''
    })
  }

  componentDidMount(){
    this.renderPosition();
  }

  renderPosition(){
    navigator.geolocation.getCurrentPosition( position => {
      console.log("Latitude is: ", position.coords.latitude);
      console.log("Longitude is: ", position.coords.longitude);
    });

    if (this.state.errorMessage && this.state.lat === null && this.state.lng === null) {
      return <div>Error: {this.state.errrorMessage}</div>
    }

    if (!this.state.errorMessage && this.state.lat !== null && this.state.lng !== null) {
      return (
          <div id="spinnerContainer">
            <h3 className="spinnerText" >Locating GPS Position...</h3>
            <Spinner className="spinner" animation="border" variant="light" role="status">
              <span className="sr-only">Locating GPS Position...</span>
            </Spinner>
          </div>
      );
    }
  }

  setUserInfo = (loginRegisterResponse) => {
    this.setState({
      userName: loginRegisterResponse.data.userName,
      loggedIn: true,
      showList: true
    })
  }

  showDashAndHideList = (e) => {
    if (!this.state.showDash && this.state.showList) {  
      this.setState({
        showDash: true,
        showList: false
      })
    }
  }

  showListAndHideDash = (e) => {
    if (!this.state.showList && this.state.showDash) {
      this.setState({
        showList: true,
        showDash: false
      })
    }
  }

  logOutReactApp = (e) => {
    this.setState({
      loggedIn: false,
      userName: '',
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
    // console.log("STATE: ", this.state);
        // {this.renderPosition()}
    return (
      <div>
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
    )
  }
}

export default App;