import React, { Component } from 'react';

//// comment will be edited on mongoDB////

class EditComment extends React.Component{
	constructor(props){
		super();
		this.state = {
			placeId: props.commentToEdit.restaurant_id[0],
			commentId: props.commentToEdit._id,
			commentBody: props.commentToEdit.commentBody
		}
	}
	componentDidMount(){
		console.log(this.state);

	}
	handleChange = (e) => {
	    e.preventDefault();
	    this.setState({
	      [e.currentTarget.name]: e.currentTarget.value 
	    })
  	}
	editComments = async (e) => {

		e.preventDefault()

		try{
			const editCommentResponse = await fetch(process.env.REACT_APP_BACK_END_URL + 'comment/restaurants/' + this.state.placeId + '/edit/' + this.state.commentId, {

				method: 'PUT',
				credentials: 'include',
				body: JSON.stringify(this.state),
				headers: {
					'Content-Type': 'application/json'
				}
			})
			const parsedCommentResponse = await editCommentResponse.json();
		}catch(err){
			console.error(err);
		}
	}
	render(){

		console.log("EDIT COMMENT PROPS");
		console.log(this.props);

		//FORM LINKED UP TO A NEW BODY W/ SUBMIT AND FETCH CALL

		return(
			<div>
				<form className="form" onSubmit={this.editComments}>
					<input className="field" type='text' value={this.state.commentBody} onChange={this.handleChange} name="commentBody" />
					<input className="field" type='submit' value='EDIT'/>
				</form>
			</div>
		)
	}
};

export default EditComment