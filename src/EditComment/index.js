import React from 'react';

class EditComment extends React.Component{
	constructor(props){
		super();
		this.state = {
			placeId: props.commentToEdit.restaurant_id,
			commentId: props.commentToEdit._id,
			commentBody: props.commentToEdit.commentBody
		}
	}
	componentDidMount(){
		// console.log(this.state);

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
			const editCommentResponse = await fetch(process.env.REACT_APP_BACK_END_URL + '/comment/restaurants/' + this.state.placeId + '/edit/' + this.state.commentId, {

				method: 'PUT',
				credentials: 'include',
				body: JSON.stringify(this.state),
				headers: {
					'Content-Type': 'application/json'
				}
			})
			const parsedCommentResponse = await editCommentResponse.json();
			console.log(parsedCommentResponse);
			this.props.clearCommentToEdit();
		}catch(err){
			console.error(err);
		}
	}
	render(){
		// console.log('EDIT COMMENT STATE: ', this.state);
		// console.log("EDIT COMMENT PROPS: ", this.props);

		return(
			<div>
				<form className="form" onSubmit={this.editComments}>
					<input className="field" type='text' value={this.state.commentBody} onChange={this.handleChange} name="commentBody"/>
					<input className="field" type='submit' value='EDIT'/>
				</form>
			</div>
		)
	}
};

export default EditComment