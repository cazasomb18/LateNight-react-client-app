import React, { Component } from 'react'
import EditComment from '../EditComment'

class RestaurantComment extends Component {
	constructor(props){
		super();
		this.state = {
			commentToEdit: null,
			userData: [...this.props.userData]
		}
	}
	componentDidMount(){
		// const userData = this.props.userData;
		console.log("STATE, RestaurantComment, in CDM: ", this.state);
		console.log("PROPS, RestaurantComment, in CDM: ", this.props);
	}
	setCommentToEdit = (e) => {
		// console.log("set comment to edit triggered")
		// console.log("restaurant ID: ", e.currentTarget.dataset.restaurantId)
		// console.log("comment ID: ", e.currentTarget.dataset.commentId)

		const restaurantId = e.currentTarget.dataset.restaurantId;
		const commentId = e.currentTarget.dataset.commentId;

		const foundRestaurant = this.props.userData.find((restaurant) => {
			if (restaurant._id === restaurantId) {
				return true
			} else {
				return false
			}
		})
		// console.log('this is the found restaurant')
		// console.log(foundRestaurant)

		const foundComment = foundRestaurant.comments.find((comment) => {
			if (comment._id === commentId) {
				return true
			} else {
				return false
			}
		})
		this.setState({
			commentToEdit: foundComment
		})
	}
	clearCommentToEdit = () => {
		this.setState({
			commentToEdit: null
		})
	}
	render(){
		console.log("restaurant comment props:")
		console.log(this.props);

		console.log("restaurant comment state:")
		console.log(this.state)

		const deleteRestaurantComment = async (restaurantPlaceId, commentId) => {
		    try{				
		      	const deletedComment = await fetch(process.env.REACT_APP_BACK_END_URL + '/comment/restaurants/' + restaurantPlaceId + '/' + commentId, {
		        	method: 'DELETE',
		        	credentials: 'include'
			      })
		      	console.log("unparsed deleted comment:")
		      	console.log(deletedComment)

		      	const deletedCommentResponse = await deletedComment.json();
		      	console.log("parsed deleted comment response: ")
		      	console.log(deletedCommentResponse);

		      	console.log("original raw response:")
		      	console.log(deletedComment)

		      	if (deletedComment.ok) {

		      		console.log("are we doing this");
		      		this.props.getUserRestaurantInfo();
		      	}

		    }catch(err){
		 		console.error(err)
			}
		}
		// const userData = this.props.userData;
		const filteredRestaurantList = this.state.userData.filter((restaurant) => {
			if (restaurant.comments < 0) {
				return false
			} else {
				return true 
			}
		});
//// NESTED MAP - ONE RETURNS THE RESTAURANT INFO, OTHER RETURNS THE COMMENT INFO /////
		const restaurantList = filteredRestaurantList.map((restaurant, i) => {
			

			const thisCommentListWithNulls = restaurant.comments.map((comment, j) => {
				if (comment.restaurant_id[0] === restaurant._id){

					return(
						<ul key={`comment-${j}`}>
							<p>{comment.commentBody}</p>
							<form className="form" onSubmit={
								(e) => { 
									e.preventDefault();
									deleteRestaurantComment(restaurant.place_id, comment._id);
									this.props.getUserRestaurantInfo();
								}
							}>
							<button className="field">Delete Comment</button>
							</form>
							{ !this.state.commentToEdit ? 
								<button 
									className="field" 
									data-restaurant-id={comment.restaurant_id[0]} 
									data-comment-id={comment._id} 
									onClick={this.setCommentToEdit}> Edit Comment 
								</button> 
								: 
								<EditComment 
									clearCommentToEdit={this.clearCommentToEdit} 
									commentToEdit={this.state.commentToEdit} 
								/>
							}

						</ul>
					);
				} 
				else {
					return null 
				}
			})
			/// FILTERS OUT NULL COMMENT ARRAYS FROM DATA USER'S DATA OBJECT ///
			const thisCommentList = thisCommentListWithNulls.filter((e) => e !== null)
				return (
					<div className="form" key={`restaurant-${i}`}>
						<h2 className="title">Restaurant: {restaurant.name}</h2><br/>
						<h3 className="subTitle">Google ID: {restaurant.place_id}</h3><br/>
						<h3 className="subTitle">Comments made by: {restaurant.userName}</h3><br/>
							{thisCommentList.length < 1 ? <h1> No user data </h1> : thisCommentList}
						<br/>
					</div>
				);
		})


		return (
			<div className="form">
				{restaurantList}
			</div>
		)
	}
}

export default RestaurantComment;