import React { Component } from 'react';

//// comment will be edited on mongoDB////

class App extends React.Component{
	constructor(props){
	super(props);

	this.setState{
			comment_id: this.props.comment_id,
			place_id: this.props.place_id,
			userName: this.props.userName
	} try{

	const ':place_id' = this.props.place_id;
	const editCommentResponse = await fetch(REACT_APP_BACK_END_URL + 'restaurants/:place_id/edit/:comment_id', {

		method: 'PUT',
		credentials: 'include',
		body: JSON.stringify(this.state),
		headers: {
			'Content-Type': 'application/json'
		}
	}
	const parsedCommentResponse = await JSON.stringify.editCommentResponse;
	}catch(err){
		console.log(err);
		console.error(err);

	}render(){
		if (parsedCommentResponse.userName === this.state.userName){
			///add logic where the user will be able to fucking see their 
			///comments and fucking edit them lol... what the fuck ever...
			/// will probably need a form and the userName to retrieve their posts
			/// and edit them
		}
	}

};