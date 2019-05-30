import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import RegisterControl from '../RegisterControl';

class Login extends Component {
  constructor(props){
    super();
    this.state = {
      userName: '',
      loggedIn: false
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
          loggedIn: true,
          userName: parsedResponse.data.userName
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
      console.log(err);
      console.error(err);

    }
  }
  logOut = async (e) => {
      e.preventDefault();
      try{
        const logoutResponse = await fetch(process.env.REACT_APP_BACK_END_URL + 'auth/logout', {
          method: 'GET',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json'
          }})
        console.log(logoutResponse);
        const parsedResponse = await JSON.stringify(logoutResponse);
        console.log('parsedResponse: ', parsedResponse);
        if (parsedResponse){
          this.setState({
            loggedIn: false,
            userName: ''
          })
          console.log("App state: ", this.state);
        }
      }catch(err){
        console.log(err);
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
        <div>
					{
            this.state.loggedIn ? 
            <button onClick={this.logOut}>Logout</button>  

            : 
            <div>
              <h1 className='/login-title'>Login for LateNight</h1>
                
              <form className="mb-2 mr-sm-2 mb-sm-0" onSubmit={this.handleSubmit}>
                <p className="mb-2 mr-sm-2 mb-sm-0">Username:</p>

                <input className="mr-sm-2" type="text" name="userName" placeholder="username" onChange={this.handleChange}/>
                 <br/>
                
                <p className="mb-2 mr-sm-2 mb-sm-0">Password:</p>
                  <br/>

                <input className="mr-sm-2" type="password" name="password" placeholder="********" onChange={this.handleChange}/>
                  <br/>
                <input className="mr-sm-2" type="submit" value="Login!"/> 
              </form>
            </div>
          }
        </div>
      );
  }
}

export default Login;