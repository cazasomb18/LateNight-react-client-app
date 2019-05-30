import React, { Component } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { Route, Switch, Link } from 'react-router-dom';
import RegisterControl from './RegisterControl';
import Login from './Login';
import Header from './Header';
import AppTitle from './TitleHeader';
import LateRestaurantsList from './LateRestaurantsList';
// import HomeContainer from './Home';

class App extends Component {
  constructor(props){
    console.log('constructor',);
    super();
    this.state = ({
      loggedIn: false,
      isRegistered: false,
      userName: '',
      restaurants: [],
      comments: [],
      showList: false

    })
  }
  setUserInfo = (userInfo) => {
    if (this.state.loggedIn === true){
      this.setState({
        loggedIn: true,
        isRegistered: true
        // userName: userInfo.userName,
        // userName: this.props.userName

      })
    console.log("APP State before cdm: ", this.state);
    }
  }
  componentDidMount () {
    //// INITIAL DOM RENDERING ///
    console.log('cdm: ');
    console.log('STATE: ', this.state);
    console.log('PROPS: ', this.props);

  }
  // logOut = async (e) => {
  //   e.preventDefault();
  //   try{
  //     const logoutResponse = await fetch(process.env.REACT_APP_BACK_END_URL + 'auth/logout', {
  //       method: 'GET',
  //       credentials: 'include',
  //       headers: {
  //         'Content-Type': 'application/json'
  //       }})
  //     console.log(logoutResponse);
  //     const parsedResponse = await JSON.stringify(logoutResponse);
  //     console.log('parsedResponse: ', parsedResponse);
  //     if (parsedResponse){
  //       this.setState({
  //         loggedIn: false,
  //         userName: ''
  //       })
  //       console.log("App state: ", this.state);
  //     }
  //   }catch(err){
  //     console.log(err);
  //     console.error(err);

  //   }
  // }
  handleChange = (e) => {
    e.preventDefault();
    this.setState({

      [e.currentTarget.name]: e.currentTarget.value 
    })
  }
  ////////// CONDITIONAL RENDERING LOGIC FOR RESTAURANTS LIST RELATED TO LOGIN STATE////////
  ////////// CONDITIONAL RENDERING LOGIC FOR RESTAURANTS LIST RELATED TO LOGIN STATE////////


  render(){
    console.log(this.state);

    return (
      <main>
        <div>
          <AppTitle/>
        <Header/>
          {!this.state.loggedIn ? <Login/> : null}
          {this.state.userName ? <LateRestaurantsList /> : null}

        </div>
      </main>
    );
  }
}

export default App;

        // <Switch>
          // <Route path="/home" onClick={this.showList} />
          // <Route path="/restaurantList" component={LateRestaurantsList}/>
        //   <Route path="/register" render={ (props) => <RegisterControl {...props} setUserInfo={this.setUserInfo}/> } />
        //   <Route path="/login" render={ (props) => <Login {...props} setUserInfo={this.props.setUserInfo}/> } />
        // </Switch>
