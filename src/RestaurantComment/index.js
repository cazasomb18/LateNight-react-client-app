import React, { Component } from 'react';
import EditComment from '../EditComment';

class RestaurantComment extends Component {
	constructor(props){
		super();
		this.state = {
			commentToEdit: ''
		}
	}
	componentDidMount(){

	}
	setCommentToEdit = (e) => {

		const restaurantId = e.currentTarget.dataset.restaurantId;

		const commentId = e.currentTarget.dataset.commentId;


		const foundRestaurant = this.props.userData.find((restaurant) => {
			if (restaurant._id === restaurantId) {
				return true
			} else {
				return false
			}
		})

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

	render(){

		const userData = this.props.userData;

		const deleteRestaurantComment = async (restaurantPlaceId, commentId) => {
		    try{				
		      	const deletedComment = await fetch(process.env.REACT_APP_BACK_END_URL + '/comment/restaurants/' + restaurantPlaceId + '/' + commentId, {
		        	method: 'DELETE',
		        	credentials: 'include'
			      })

		      	const deletedCommentResponse = await deletedComment.json();
		      	// console.log("parsed deleted comment response: ")
		      	// console.log(deletedCommentResponse);

		      	if (deletedComment.ok) {

		      		console.log("are we doing this");
		      		this.props.getUserRestaurantInfo();
		      	}

		    }catch(err){
		 		console.error(err)
			}
		}
		//removing userData entires where foundComments.length === 0
		const filteredRestaurantList = userData.filter((restaurant) => {
			if (restaurant.comments.length < 1) {
				return false
			} else {
				return true 
			}
		})
		// console.log("filteredRestaurantList: ", filteredRestaurantList);
		// NESTED MAP - THIS ONE RETURNS USER'S THE RESTAURANT INFO
		const restaurantList = filteredRestaurantList.map((restaurant, i) => {
			
			//THIS MAP RETURNS USER'S RESTAURANT COMMENTS
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
							{
								!this.state.commentToEdit ? 
									
								<button 
									className="field" 
									data-restaurant-id={comment.restaurant_id[0]} 
									data-comment-id={comment._id} 
									onClick={this.setCommentToEdit}> 
									Edit Comment
								</button> 
								: 
								<EditComment 
									commentToEdit={this.state.commentToEdit}
									getUserRestaurantInfo={this.props.getUserRestaurantInfo}
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
							{thisCommentList.length < 1 ? null : thisCommentList}
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