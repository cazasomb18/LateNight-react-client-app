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
     		// console.log('parsedResponse: ', parsedResponse);
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
  	   		// console.log(logoutResponse);
  	   		const parsedResponse = await logoutResponse.json();
  	   		// console.log('logout response: ', parsedResponse);
  	   		if (parsedResponse.loggedout === true) {
  	   			this.props.logOutReactApp()
  	   		}
  		}catch(err){
  	 		console.error(err)
  	 	}
	}
	render() {

	    return(
	    	<div className="form">
			  <Collapsible className="title" trigger="ABOUT LATE NIGHT BYTES">
			  	<h3 className="title">HERE IS WHERE YOU WILL WRITE THE USER STORIES</h3>
			  	<p className="subTitle">USER STORIES WILL GO HERE USER STORIES WILL GO HERE USER STORIES WILL GO HERE </p>
			  	<p className="subTitle">USER STORIES WILL GO HERE USER STORIES WILL GO HERE USER STORIES WILL GO HERE </p>
			  	<p className="subTitle">USER STORIES WILL GO HERE USER STORIES WILL GO HERE USER STORIES WILL GO HERE </p>
			  	<p className="subTitle">USER STORIES WILL GO HERE USER STORIES WILL GO HERE USER STORIES WILL GO HERE </p>
			  </Collapsible>

		   	{ 
		   		this.props.loggedIn
		   		? 
		      	<div className="form">
		      		<h4 className="title">Welcome back {this.state.userName}!!!</h4>
		      		<button className="field" onClick={this.logOut}>Logout!</button>
		      	</div>
		   		:

			   	<div className="form">    				
		    		<div className="form">
				      <Collapsible className="title" trigger="REGISTRATION">
								<h1 className="title">Register for LateNight Bytes</h1><br/>
								<h3 className="subTitle">CREATE AN ACCOUNT!</h3>
								<form className="form" onSubmit={this.handleRegister}>
									<input className="field" type="text" name="userName" placeholder="username" onChange={this.handleChange}/><br/>
									<input className="field" type="password" name="password" placeholder="password" onChange={this.handleChange}/><br/>
									<input className="field" type="email" name="email" placeholder="email" onChange={this.handleChange}/><br/>
									<input className="field" type="submit" value="Register!"/>
								</form>

				      </Collapsible>
					<div>


		    		</div>
				      <Collapsible className="title" trigger="LOGIN/LOGOUT">	
						      <h1 className="title">Login for LateNight Bytes</h1><br/>
						      <h3 className="subTitle">LOGIN TO LATENIGHTBYTES!</h3>
						        <form className="form" onSubmit={this.handleLogin}>
						          <input className="field" type="text" name="userName" placeholder="username" onChange={this.handleChange}/><br/>
						          <input className="field" type="password" name="password" placeholder="password" onChange={this.handleChange}/><br/>
						          <input className="field" type="submit" value="Login!"/>
						        </form>
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