import React, { Component } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
// import { Route, Switch} from 'react-router-dom';
// import RegisterControl from './RegisterControl';
// import Login from './Login';
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
  ////////// CONDITIONAL RENDERING LOGIC FOR RESTAURANTS LIST RELATED TO LOGIN STATE////////
  render(){

    console.log(this.state);
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




          // < Switch>
          //   < Route path="/register" render={ (props) => <RegisterControl {...props} setUserInfo={props}/> } />
          //   < Route path="/login" render={ (props) => <Login {...props} setUserInfo={props}/> } />
          // < /Switch>
