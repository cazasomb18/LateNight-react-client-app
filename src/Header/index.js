import React from 'react';
import Collapsible from 'react-collapsible';
import Card from 'react-bootstrap/Card';
 
class Header extends React.Component {
	constructor(props){
		super();
	  	this.state = {
	  		userName: '',
	  		password: '',
	  		loginResponse: '',
	  		registerResponse: ''
  		}
	}
	handleChange = (e) => {
		e.preventDefault();
    	this.setState({[e.target.name]: e.target.value});
  	}
	handleRegister = async (e) => {
		e.preventDefault();
		try{			
			const registerResponse = await fetch(process.env.REACT_APP_BACK_END_URL + '/auth/register', {
				method: 'POST',
				credentials: 'include',
				body: JSON.stringify(this.state),
				headers: {
					'Content-Type': 'application/json'
				}
			})
			const parsedResponse = await registerResponse.json();
			// console.log("register parsedResponse: ", parsedResponse);
			if (parsedResponse.success === false) {
				this.setState({
					registerResponse: parsedResponse.data
				})
			}
		}catch(err){
			console.error(err)
		}
	}
  	handleLogin = async (e) => {
  		e.preventDefault();
    	try{
     		const loginResponse = await fetch(process.env.REACT_APP_BACK_END_URL + '/auth/login', {
     	  		method: 'POST',
     	 		credentials: 'include',
     	  		body: JSON.stringify(this.state),
     	  		headers: {
 	    			'Content-Type': 'application/json'
     	  		}
 	  		})
     		const parsedResponse = await loginResponse.json();
     		// console.log('login parsedResponse: ', parsedResponse);
 			if (parsedResponse.success === true) {
				this.props.setUserInfo(parsedResponse);
     		} else {
				this.setState({
					loginResponse: parsedResponse.data
				})
     		}
    	}catch(err){
      		console.error(err);
    	}
  	}
  	logOut = async (e) => {
  		try{
  	   		const logoutResponse = await fetch(process.env.REACT_APP_BACK_END_URL + '/auth/logout/', {
  	     		method: 'GET',
  	     		credentials: 'include',
  	     		headers: {
  	       			'Content-Type': 'application.json'
  	     		}
  	     	})
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
	    	<div id="collapsibleContainer" className="collapsible fluid">
				<Collapsible className="collapsible title bg-transparent" trigger="ABOUT THE APP">
						<Card className="bg-transparent">
							<Card.Text id="userStoryPTag" className="bg-transparent">Late Night Bytes consumes google maps and places api to find late night food in your area. Make sure you agree to share your location, Late Night Bytes is dependent up on this to return the restaurants that match your location, sound good? GREAT! Create an account by clicking the 'REGISTER' drop down menu and you will be logged in. After you're logged in, try the 'FIND LATE BYTES' button, it will show you all the restaurants in your area! If you see something you like on the list, go ahead and leave a comment, this information will be stored in your dashboard. Your dashboard is your private information, and no one else can access it. This a good way to keep track of your favorite late night bytes!</Card.Text>
						</Card>
				</Collapsible>

	   	{ 
	   		this.props.loggedIn
	   		?

	      	<div className="collapsible fluid">
	      		<div className="collapsible title bg-transparent" onClick={this.logOut}>LOGOUT</div>
	      	</div> 

	   		:

		   	<div className="collapsible fluid">
		      <Collapsible className="collapsible title bg-transparent" trigger="REGISTER">
						<h3 className="headerSubTitle subTitle bg-transparent">CREATE AN ACCOUNT</h3>
						<form className="form bg-transparent" onSubmit={this.handleRegister}>
							<input className="field" type="text" name="userName" placeholder="username" onChange={this.handleChange}/><br/>
							<input className="field" type="password" name="password" placeholder="password" onChange={this.handleChange}/><br/>
							<input className="field" type="email" name="email" placeholder="email" onChange={this.handleChange}/><br/>
							<input className="field " type="submit" value="Register!"/>
						</form>
		      </Collapsible>
		      	{
		      		!this.state.registerResponse.success
		      			?
		      				<div className="text-danger">{this.state.registerResponse}</div>
		      			:

		      		null

		      	}


		      <Collapsible className="collapsible title bg-transparent" trigger="LOGIN">
			      <h3 className="headerSubTitle subTitle bg-transparent">PLEASE LOGIN</h3>
			        <form className="form bg-transparent" onSubmit={this.handleLogin}>
			          <input className="field" type="text" name="userName" placeholder="username" onChange={this.handleChange}/><br/>
			          <input className="field" type="password" name="password" placeholder="password" onChange={this.handleChange}/><br/>
			          <input className="field" type="submit" value="Login!"/>
			        </form>
		      </Collapsible>
		      <br/>
			        <div className="logDiv">
			        {
			        	!this.state.loginResponse.success
			        		?
			        			<div className="text-danger">{this.state.loginResponse}</div>
			        		:

			        	null
			        }
			        </div>
		      <br/>
			</div>
		   	}



	    	</div>
	    );
 	 }
};
 
export default Header;