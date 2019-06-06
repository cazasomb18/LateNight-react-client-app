import React, { Component } from 'react';

class RegisterControl extends Component {
	constructor(props) {
	super();
	this.state = {
		userName: '',
		isRegistered: false
		}
	console.log(this.state);
	console.log(this.props);
	}
	handleChange = (e) => {
		e.preventDefault();
		this.setState({
			[e.currentTarget.name]: e.currentTarget.value
		})
	}
	handleSubmit = async (e) => {
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
	render(){
	if (this.state.isRegistered === false) {
		return (
		<div className="form">
			<h1 className='register-title'>Register for LateNight</h1><br/>
				<form onSubmit={this.handleSubmit}>
					<h4 >Username:</h4>
					<input type="text" name="userName" placeholder="username" onChange={this.handleChange}/><br/>
					<h4 >Password:</h4>
					<input type="password" name="password" placeholder="********" onChange={this.handleChange}/><br/>
					<h4 >Email:</h4>
					<input type="email" name="email" placeholder="email" onChange={this.handleChange}/><br/>
					<input type="submit" value="Register!"/>
				</form>
		</div>
		);
	} else {
		return (
			<h4>{this.state.userName} has registered, now login!</h4>
		);
	}
}}

export default RegisterControl;




			// this.props.setUserInfo(userInfo);
			// this.props.history.push("/login");
			/// REDIRECT TO ^^^ LOGIN?///