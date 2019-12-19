import React from 'react';
// import Container from 'react-bootstrap/Container';
// import Row from 'react-bootstrap/Row';
// import Col from 'react-bootstrap/Col';

class EditComment extends React.Component{
	constructor(props){
		super();
		this.state = {
			placeId: props.commentToEdit.restaurant_id[0],
			commentId: props.commentToEdit._id,
			commentBody: props.commentToEdit.commentBody,
			editingComment: false
		}
	}
	componentDidMount(){

	}
	handleChange = (e) => {
	    e.preventDefault();
	    this.setState({
	      [e.currentTarget.name]: e.currentTarget.value
	    })
  	}
  	editingCommentView = (e) => {
  		e.preventDefault();
  		this.setState({
  			editingComment: true
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
			console.log("parsedCommentResponse: ", parsedCommentResponse);
			
			this.props.getUserRestaurantInfo();
		}catch(err){
			console.error(err);
		}
	}
	render(){
		if (!this.state.editingCommentView) {
			return(
					<form className="editCommentBorder form" onSubmit={this.editComments}>
						<input className="field bg-dark" type='text' value={this.state.commentBody} onChange={this.handleChange} onClick={this.editingCommentView} name="commentBody" placeholder={this.state.commentBody}/>
						<input className="field bg" type='submit' value='EDIT'/>
					</form>
			)

		} else {
			return(
				null
			)
		}

	}
};

export default EditComment