import React from 'react';
import Collapsible from 'react-collapsible';
 
class Header extends React.Component {
	constructor(props){
	super();
  	this.state = {
  		userName: '',
  		password: '',
  		loggedIn: false,
  		isRegistered: false
  		}
	}
  	componentDidMount(){

  	}
	handleChange = (e) => {
    	this.setState({[e.target.name]: e.target.value});
  	}
	handleRegister = async (e) => {
		e.preventDefault();
		console.log(this.state);
		try{			
			const registerResponse = await fetch(process.env.REACT_APP_BACK_END_URL + 'auth/register/', {
				method: 'POST',
				credentials: 'include',
				body: JSON.stringify(this.state),
				headers: {
					'Content-Type': 'application/json'
				}})
			console.log(registerResponse);
			const parsedResponse = await registerResponse.json();
			console.log("parsedResponse: ", parsedResponse);
			if (parsedResponse.registered === true) {
				this.setState({
					isRegistered: true
				})
			}
		}catch(err){
			console.log(err);
			console.error(err)
		}
	}
  	handleLogin = async (e) => {
    	e.preventDefault();
    	try{
     		const loginResponse = await fetch(process.env.REACT_APP_BACK_END_URL + 'auth/login/', {
     	  		method: 'POST',
     	 		credentials: 'include', 
     	  		body: JSON.stringify(this.state),
     	  		headers: {
     	    		'Content-Type': 'application/json'
     	  		}	
 	  		})
     		console.log(loginResponse);
     		const parsedResponse = await loginResponse.json();
     		console.log('parsedResponse: ', parsedResponse);
     		if (parsedResponse.success === true) {
     	  		this.setState({
     	    		loggedIn: true,
     	    		isRegistered: true
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
  	     		}
  	     	})
  	   		console.log(logoutResponse);
  	   		const parsedResponse = await logoutResponse.json();
  	   		console.log('logout response: ', parsedResponse);
  	   		if (parsedResponse.loggedout === true) {
  	     		this.setState({
  	       			loggedIn: false
  	     		})
  	     	console.log("App state: ", this.state);
  	     	// console.log("Props: ", this.props);
  	     	console.log(parsedResponse.loggedout);
  	   		}
  		}catch(err){
  	 		console.error(err)
  	 	}
	}
	render() {
    return(
    	<div>
    		<div>
    		  <Collapsible trigger="ABOUT LATENIGHTBYTES ==> CLICK TO EXPAND">
    		  	<h1></h1>
    		  	<p>USER STORIES WILL GO HERE USER STORIES WILL GO HERE USER STORIES WILL GO HERE </p>
    		  	<p>USER STORIES WILL GO HERE USER STORIES WILL GO HERE USER STORIES WILL GO HERE </p>
    		  	<p>USER STORIES WILL GO HERE USER STORIES WILL GO HERE USER STORIES WILL GO HERE </p>
    		  	<p>USER STORIES WILL GO HERE USER STORIES WILL GO HERE USER STORIES WILL GO HERE </p>

    		  </Collapsible>
		      <Collapsible trigger="CLICK TO REGISTER ==> CLICK TO EXPAND">
				<div className="registerForm">
				{ this.state.isRegistered === false ?
				    <div>
						<h1 className='registerTitle'>Register for LateNight Bytes</h1><br/>
						<p>CREATE AN ACCOUNT!</p>
						<form onSubmit={this.handleRegister}>
							<h4 >Username:</h4>
							<input type="text" name="userName" placeholder="username" onChange={this.handleChange}/><br/>
							<h4 >Password:</h4>
							<input type="password" name="password" placeholder="********" onChange={this.handleChange}/><br/>
							<h4 >Email:</h4>
							<input type="email" name="email" placeholder="email" onChange={this.handleChange}/><br/>
							<input type="submit" value="Register!"/>
						</form>
				    </div>
					: 
					<div>
						<h4>Thanks for Registering {this.state.userName}!!!</h4>
					</div>
				}
				</div>
		      </Collapsible>
			<div>
    		</div>
		      <Collapsible trigger="LOGIN/LOGOUT ==> CLICK TO EXPAND">
			    <div className="loginForm">
		      { this.state.loggedIn === false ? 
		      	<div>	
			      <h1 className='loginTitle'>Login for LateNight Bytes</h1><br/>
			      <p>LOGIN TO LATENIGHTBYTES!</p>
			        <form onSubmit={this.handleLogin}>
			          <h4 >Username:</h4>
			          <input type="text" name="userName" placeholder="username" onChange={this.handleChange}/><br/>
			          <h4 >Password:</h4>
			          <input type="password" name="password" placeholder="password" onChange={this.handleChange}/><br/>
			          <input type="submit" value="Login!"/>
			        </form>
		      	</div>
		      	:
			      	<div>
			      		<h4>Welcome to LateNightBytes {this.state.userName}!!!</h4>
			      		<button onClick={this.logOut}>Logout!</button>
			      	</div>
  			  }
			    </div>
		      </Collapsible>
			</div>
    	</div>
    );
  }
};
 
export default Header;


// { !this.state.loggedIn ? <input type="submit" value="Login!"/> : <input type="submit" value="Logout!"/>}






// import React from 'react';
// import { Link } from 'react-router-dom';

// const Header = () => {

// 	return (
// 		<header> 
// 			<div className="header header-expand-lg header-dark bg-dark">
// 				<Link to='/register'><h2 className=" register register-expand-md register-light bg-dark">Register</h2> </Link> <br/>
// 				<Link to='/login'><h2 className=" login login-expand-md login-light bg-dark">Login / Logout</h2> </Link> <br/>
// 			</div>
// 		</header>

// 		)
// }

// export default Header;