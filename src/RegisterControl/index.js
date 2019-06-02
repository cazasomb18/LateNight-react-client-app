import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import Login from '../Login';


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
			const registerResponse = await fetch(process.env.REACT_APP_BACK_END_PY_URL + 'users/registration', {
				method: 'POST',
				credentials: 'include',
				body: JSON.stringify(this.state),
				headers: {
					'Content-Type': 'application/json'
				}})
			console.log(registerResponse);
			const parsedResponse = await registerResponse.json;
			console.log("parsedResponse: ", parsedResponse);
			if (parsedResponse.success === true) {
				this.setState({
					isRegistered: true
				})
			}
			// this.props.setUserInfo(userInfo);
			// this.props.history.push("/login");
			/// REDIRECT TO ^^^ LOGIN?///
		}catch(err){
			console.log(err);
			console.error(err)
		}
		///continue this logic to get the backend do to the work///
	}

	render(){	
		return (
		<div className="form">
			<h1 className='register-title'>Register for LateNight</h1><br/>
				<form className="mb-2 mr-sm-2 mb-sm-0" onSubmit={this.handleSubmit}>
					<h4 className="mb-2 mr-sm-2 mb-sm-0">Username:</h4>
					<input className="mr-sm-2" type="text" name="username" placeholder="username" onChange={this.handleChange}/><br/>
					<h4 className="mb-2 mr-sm-2 mb-sm-0">Password:</h4>
					<input className="mr-sm-2" type="password" name="password" placeholder="********" onChange={this.handleChange}/><br/>
					<h4 className="mb-2 mr-sm-2 mb-sm-0">Password:</h4>
					<input className="mr-sm-2" type="password" name="verify_password" placeholder="********" onChange={this.handleChange}/><br/>
					<h4 className="mb-2 mr-sm-2 mb-sm-0">Email:</h4>
					<input className="mr-sm-2" type="email" name="email" placeholder="email" onChange={this.handleChange}/><br/>
					<input className="mr-sm-2" type="submit" value="Register!"/>
				</form>
		</div>
		)
	}
}

export default RegisterControl;