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
      showDash: false

    })
    console.log('APP STATE BEFORE CDM: ', this.state);
  }
  setUserInfo = (userInfo) => {
    if (this.state.loggedIn === true){
      this.setState({
        loggedIn: true,
        isRegistered: true,
        showList: false,
      })
    }
  }
  componentDidMount () {
    //// INITIAL DOM RENDERING ///
    console.log('cdm: ');
    console.log('STATE: ', this.state);
    console.log('PROPS: ', this.props);
    if (this.state.loggedIn === true){
      this.setState({
        showList: true
      })
    }
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
          <AppTitle userName={this.state.userName}/>
          <Header/>
      { !this.state.loggedIn === true ?
        <div>
          <Dashboard userName={this.state.userName}/>
          <LateRestaurantsList userName={this.state.userName}/>
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
