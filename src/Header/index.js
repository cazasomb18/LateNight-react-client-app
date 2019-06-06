import React from 'react';
import Collapsible from 'react-collapsible';
 
class Header extends React.Component {
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
	handleRegister = async (e) => {
		e.preventDefault();
		try{			
			const registerResponse = await fetch(process.env.REACT_APP_BACK_END_URL + 'auth/register/', {
				method: 'POST',
				credentials: 'include',
				body: JSON.stringify(this.state),
				headers: {
					'Content-Type': 'application/json'
				}
			})
			const parsedResponse = await registerResponse.json();
			console.log("parsedResponse: ", parsedResponse);
			if (parsedResponse.registered === true) {
				this.props.setUserInfo(parsedResponse);
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
     		const parsedResponse = await loginResponse.json();
     		console.log('parsedResponse: ', parsedResponse);
     		if (parsedResponse.success === true) {
     			this.props.setUserInfo(parsedResponse)
     		}
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
  	   			this.props.logOutReactApp()
  	   		}
  		}catch(err){
  	 		console.error(err)
  	 	}
	}
	render() {
		console.log("here is state");
		console.log(this.state);
    return(
    	<div>
		  <Collapsible trigger="ABOUT LATENIGHTBYTES ==> CLICK TO EXPAND/CONTRACT">
		  	<h3>HERE IS WHERE YOU WILL WRITE THE USER STORIES</h3>
		  	<p>USER STORIES WILL GO HERE USER STORIES WILL GO HERE USER STORIES WILL GO HERE </p>
		  	<p>USER STORIES WILL GO HERE USER STORIES WILL GO HERE USER STORIES WILL GO HERE </p>
		  	<p>USER STORIES WILL GO HERE USER STORIES WILL GO HERE USER STORIES WILL GO HERE </p>
		  	<p>USER STORIES WILL GO HERE USER STORIES WILL GO HERE USER STORIES WILL GO HERE </p>
		  </Collapsible>

	   	{ 
	   		this.props.loggedIn
	   		? 
	      	<div>
	      		<h4>Welcome to LateNightBytes {this.state.userName}!!!</h4>
	      		<button onClick={this.logOut}>Logout!</button>
	      	</div>
	   		:

		   	<div>    				
	    		<div>
			      <Collapsible trigger="REGISTRATION ==> CLICK TO EXPAND/CONTRACT">
					<div className="registerForm">
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
						
					
					</div>
			      </Collapsible>
				<div>


	    		</div>
			      <Collapsible trigger="LOGIN/LOGOUT ==> CLICK TO EXPAND/CONTRACT">
				    <div className="loginForm">
			       
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

				    </div>
			      </Collapsible>
				</div>


			</div>
	   	}



    	</div>
    );
  }

  				// 		<div>
						// 	<h4>Thanks for Registering {this.state.userName}!!!</h4>
						// </div>
};
 
export default Header;