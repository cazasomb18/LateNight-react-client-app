import React { Component } from 'react';

//// comment will be edited on mongoDB////

class EditComment extends React.Component{
	constructor(props){
	super();
	this.state = {
		comment_id:
		place_id:
		userName:
		}
	}
	componentDidMount(){

	}
	editComments = async (e) => {
		try{
			const ':place_id' = this.props.place_id;
			const editCommentResponse = await fetch(REACT_APP_BACK_END_URL + 'restaurants/:place_id/edit/:comment_id', {

				method: 'PUT',
				credentials: 'include',
				body: JSON.stringify(this.state),
				headers: {
					'Content-Type': 'application/json'
				}
			}
			if (parsedCommentResponse.userName === this.state.userName){
			}
			const parsedCommentResponse = await JSON.stringify.editCommentResponse;
		}catch(err){
			console.log(err);
			console.error(err);

	}
	render(){
		return(
			<div>
				<h1>THIS IS THE EDIT COMMENT DESTRUCTURED COMPONENT</h1>
			</div>
		)
	}
};