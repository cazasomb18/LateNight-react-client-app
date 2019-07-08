import React from 'react';
import Collapsible from 'react-collapsible';
import Card from 'react-bootstrap/Card'
 
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
			const registerResponse = await fetch(process.env.REACT_APP_BACK_END_URL + '/auth/register', {
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
     		const loginResponse = await fetch(process.env.REACT_APP_BACK_END_URL + '/auth/login', {
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
				this.props.setUserInfo(parsedResponse);
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
  	   		console.log('logout response: ', parsedResponse);
  	   		if (parsedResponse.loggedout === true) {
  	   			this.props.logOutReactApp()
  	   		}
  		}catch(err){
  	 		console.error(err)
  	 	}
	}
	render() {
	    return(
	    	<div className="collapsible">
				<Collapsible className="title collapsible" trigger="ABOUT LATE NIGHT BYTES">
					<Card className="bg-dark">
						<Card.Img src="https://images.unsplash.com/photo-1499028344343-cd173ffc68a9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"/>
						<Card.ImgOverlay>
							<Card.Text id="userStoryPTag">Late Night Bytes consumes google maps and places api to find late night food in your area. Make sure you agree to share your location, Late Night Bytes is dependent up on this to return the restaurants that match your location, sound good? GREAT! Create an account by clicking the 'REGISTER' drop down menu and you will be logged in. After you're logged in, try the 'FIND LATE BYTES' button, it will show you all the restaurants in your area! If you see something you like on the list, go ahead and leave a comment, this information will be stored in your dashboard. Your dashboard is your private information, and no one else can access it. This a good way to keep track of your favorite late night bytes!</Card.Text>
						</Card.ImgOverlay>
					</Card>
				</Collapsible>

	   	{ 
	   		this.props.loggedIn
	   		? 
	      	<div className="form collapsible">
	      		<h4 className="title">Welcome back {this.state.userName}!!!</h4>
	      		<button className="field" onClick={this.logOut}>Logout!</button>
	      	</div>
	   		:

		   	<div className="form collapsible">
		      <Collapsible className="title collapsible" trigger="REGISTRATION">
						<h1 className="title">Register for Late Night Bytes</h1><br/>
						<h3 className="subTitle">CREATE AN ACCOUNT!</h3>
						<form className="form" onSubmit={this.handleRegister}>
							<input className="field" type="text" name="userName" placeholder="username" onChange={this.handleChange}/><br/>
							<input className="field" type="password" name="password" placeholder="password" onChange={this.handleChange}/><br/>
							<input className="field" type="email" name="email" placeholder="email" onChange={this.handleChange}/><br/>
							<input className="field" type="submit" value="Register!"/>
						</form>
		      </Collapsible>

		      <Collapsible className="title collapsible" trigger="LOGIN/LOGOUT">
				      <h1 className="title">Login for Late Night Bytes</h1><br/>
				      <h3 className="subTitle">LOGIN!</h3>
				        <form className="form" onSubmit={this.handleLogin}>
				          <input className="field" type="text" name="userName" placeholder="username" onChange={this.handleChange}/><br/>
				          <input className="field" type="password" name="password" placeholder="password" onChange={this.handleChange}/><br/>
				          <input className="field" type="submit" value="Login!"/>
				        </form>
		      </Collapsible>
			</div>
		   	}



	    	</div>
	    );
 	 }
};
 
export default Header;