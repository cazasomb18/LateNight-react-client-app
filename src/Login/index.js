import React, { Component } from 'react';
// import { Route, Redirect } from 'react-router-dom';
// import RegisterControl from '../RegisterControl';

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
      // this.props.history.push('/restaurantList');
          // if parsedResponse.success is true, then you know that 
          // parsedResponse.data contains the user information 

          // and bc the login is successful, then you should  
          // invoke this.props.setUserInfo(), passing in the parsedResponse.data 
    }catch(err){
      console.error(err);

    }
  }
  handleChange = (e) => {
    e.preventDefault();
    this.setState({

      [e.currentTarget.name]: e.currentTarget.value

    })
  }
  render(){
    return (
    <div className="loginForm">
      <h1 className='/login-title'>Login for LateNight</h1><br/>
        <form onSubmit={this.handleSubmit}>
          <h4 >Username:</h4>
          <input  type="text" name="userName" placeholder="username" onChange={this.handleChange}/><br/>
          <h4 >Password:</h4>
          <input type="password" name="password" placeholder="password" onChange={this.handleChange}/><br/>
          <input type="submit" value="Login!"/>
        </form>
    </div>
    );
  }
}

export default Login;

// {this.state.showList ? <RenderList restaurants={this.state.restaurants}/> : null}