import React, { Component } from 'react';

class Login extends Component {
  constructor(props){
    super();
    this.state = {
      userName: '',
      password: ''
 
    }
  }
  handleChange = (e) => {
    this.setState({[e.target.name]: e.target.value});
  }
  // this function calls the server for the login auth route
  handleSubmit = async (e) => {
    e.preventDefault();
    try{
      const loginResponse = await fetch(process.env.REACT_APP_BACK_END_URL + 'auth/login/', {
        method: 'POST',
        credentials: 'include', 
        body: JSON.stringify(this.state),
        headers: {
          'Content-Type': 'application/json'
        }})
      console.log(loginResponse);
      const parsedResponse = await loginResponse.json();
      console.log('parsedResponse: ', parsedResponse);
      if (parsedResponse.success === true) {
        this.setState({
          loggedIn: true
        })
        console.log("App state: ", this.state);
        console.log("Props: ", this.props);
        console.log(parsedResponse.success);
      }
          // and bc the login is successful, then you should  
          // invoke this.props.setUserInfo(), passing in the parsedResponse.data 
    }catch(err){
      console.error(err);

    }
  }
  logOut = async (e) => {
    try{
      const logoutResponse = await fetch(process.env.REACT_APP_BACK_END_URL + 'auth/logout/', {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Content-Type': 'application.json'
        }})
      console.log(logoutResponse);
      const parsedResponse = await logoutResponse.json();
      console.log('logout response: ', parsedResponse);
      if (parsedResponse.loggedout === true) {
        this.setState({
          loggedIn: false
        })
        console.log("App state: ", this.state);
        console.log("Props: ", this.props);
        console.log(parsedResponse.loggedout);
      }
    }catch(err){
      console.error(err)
    }
  }
  handleChange = (e) => {
    e.preventDefault();
    this.setState({

      [e.currentTarget.name]: e.currentTarget.value

    })
  }
  render(){
  if (this.state.loggedIn === false) {
    return (
    <div className="loginForm">
      <h1 className='/login-title'>Login for LateNight</h1><br/>
        <form onSubmit={this.handleSubmit}>
          <h4 >Username:</h4>
          <input type="text" name="userName" placeholder="username" onChange={this.handleChange}/><br/>
          <h4 >Password:</h4>
          <input type="password" name="password" placeholder="password" onChange={this.handleChange}/><br/>
          <input type="submit" value="Login!"/>
        </form>
    </div>
    );
  } else {
    return (
      <div>
        <h4>{this.state.userName} has successfully logged in!</h4>
        <button onClick={this.logOut}>Logout</button>
      </div>
    );
  }
}}

export default Login;