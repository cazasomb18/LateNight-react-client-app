import React from 'react';
// import Container from 'react-bootstrap/Container';
// import Row from 'react-bootstrap/Row';
// import Col from 'react-bootstrap/Col';

class EditComment extends React.Component{
	constructor(props){
		super(props);
		this.editComments.bind(this);
		this.state = {
			placeId: props.commentToEdit.restaurant_id[0],
			commentId: props.commentToEdit._id,
			commentBody: props.commentToEdit.commentBody,
			editingComment: false,
			showDash: false,
			showList: false
		}
	}
	componentDidMount(){
		this.props.getUserRestaurantInfo();
		console.log("editComment PROPS CDM: ", this.props);
		console.log("editComment STATE CDM: ", this.state);

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
		// e.preventDefault();
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
		console.log("editComment PROPS render: ", this.props);
		console.log("editComment STATE render: ", this.state);
		if (!this.state.editingComment) {
			return(
					<form className="form" onSubmit={(e) => {
							e.preventDefault();
							this.editComments();
							this.props.getUserRestaurantInfo();
							// e.this.props.showDashAndHideList();
						}}>
						<input className="field bg-dark" type='text' value={this.state.commentBody} onChange={this.handleChange} name="commentBody" placeholder={this.state.commentBody}/>
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