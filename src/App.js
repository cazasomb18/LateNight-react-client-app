import React, { Component } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Header from './Header';
import AppTitle from './AppTitle';
import LateRestaurantsList from './LateRestaurantsList';
import Dashboard from './Dashboard';
import Spinner from 'react-bootstrap/Spinner';
import Image from 'react-bootstrap/Image';

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
          { this.state.lat === '' ? 
            <Spinner animation="border" variant="light" role="status">
              <span className="sr-only">Finding Your Position</span>
            </Spinner> 
              : 
            null
          }
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
        <Image src="https://images.unsplash.com/photo-1532768641073-503a250f9754?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80" fluid />
      </main>
    );
  }
}

export default App;