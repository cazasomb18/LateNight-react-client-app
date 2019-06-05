import React, { Component } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { Route, Switch} from 'react-router-dom';
import RegisterControl from './RegisterControl';
import Login from './Login';
import Header from './Header';
import AppTitle from './TitleHeader';
import LateRestaurantsList from './LateRestaurantsList';
import Dashboard from './Dashboard';

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
      showList: false,
      showDash: false

    })
  }
  setUserInfo = (userInfo) => {
    if (this.state.loggedIn === true){
      this.setState({
        loggedIn: true,
        isRegistered: true,
        showList: false
      })
    console.log("APP State before cdm: ", this.state);
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
          <AppTitle/>
          <Header/>
          <Dashboard/>
          <Switch>
            <Route path="/register" render={ (props) => <RegisterControl {...props} setUserInfo={this.setUserInfo}/> } />
            <Route path="/login" render={ (props) => <Login {...props} setUserInfo={this.props.setUserInfo}/> } />
          </Switch>
          <LateRestaurantsList userName={this.state.userName}/>
        </div>
      </main>
    );
  }
}

export default App;
            // {!this.state.isRegistered ? <RegisterControl props={this.props}/> : null}
            // {!this.state.loggedIn ? <Login props={this.props}/> : null}

          // <Switch>
          //   <Route path="/home" onClick={this.showList} />
          //   <Route path="/restaurantList" component={LateRestaurantsList}/>
          //   <Route path="/register" render={ (props) => <RegisterControl {...props} setUserInfo={this.setUserInfo}/> } />
          //   <Route path="/login" render={ (props) => <Login {...props} setUserInfo={this.props.setUserInfo}/> } />
          // </Switch>