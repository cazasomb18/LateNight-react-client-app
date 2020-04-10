import React, { Component } from 'react';
import EditComment from '../EditComment';

class RestaurantComment extends Component {
	constructor(props){
		super();
		this.state = {
			commentToEdit: '',
			showList: false,
			showDash: true
		}
	}
	componentDidMount(){
<<<<<<< HEAD
		console.log("restaurantComment STATE CDM: ", this.state);
		console.log("restaurantComment PROPS CDM: ", this.props);
=======

>>>>>>> parent of 53db93c... fixed list link to dashboard
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

	deleteRestaurantComment = async (restaurantPlaceId, commentId) => {
	    try{				
	      	const deletedComment = await fetch(process.env.REACT_APP_BACK_END_URL + '/comment/restaurants/' + restaurantPlaceId + '/' + commentId, {
	        	method: 'DELETE',
	        	credentials: 'include'
		      })
	      	const deletedCommentResponse = await deletedComment.json();
	      	console.log("parsed deleted comment response: ", deletedCommentResponse);

	      	if (deletedComment.ok) {

	      		this.props.getUserRestaurantInfo();

	      		this.setState({
	      			commentToEdit: ''
	      		})
	      	}

	    }catch(err){
	 		console.error(err)
		}
	}

	render(){
<<<<<<< HEAD
		console.log("restaurantComment STATE RENDER: ", this.state);
		console.log("restaurantComment PROPS RENDER: ", this.props);

		const userData = this.props.userData;
		
=======

		const userData = this.props.userData;

		const deleteRestaurantComment = async (restaurantPlaceId, commentId) => {
		    try{				
		      	const deletedComment = await fetch(process.env.REACT_APP_BACK_END_URL + '/comment/restaurants/' + restaurantPlaceId + '/' + commentId, {
		        	method: 'DELETE',
		        	credentials: 'include'
			      })

		      	const deletedCommentResponse = await deletedComment.json();
		      	console.log("parsed deleted comment response: ", deletedCommentResponse);

		      	if (deletedComment.ok) {

		      		this.props.getUserRestaurantInfo();
		      	}

		    }catch(err){
		 		console.error(err)
			}
		}
>>>>>>> parent of 53db93c... fixed list link to dashboard
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
							<form 
								id="restaurant-comment-container" 
								className="form" 
								onSubmit={
									(e) => { 
										e.preventDefault();
<<<<<<< HEAD
										this.deleteRestaurantComment(restaurant.place_id, comment._id);
										this.props.getUserRestaurantInfo();
										this.props.showDashAndHideList();
							}}>
								<button className="field" type="submit">Delete Comment</button>

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
									showDashAndHideList={this.props.showDashAndHideList} 
									showListAndHideDash={this.props.showListAndHideDash} 
								/>
							}
=======
										deleteRestaurantComment(restaurant.place_id, comment._id);
										this.props.getUserRestaurantInfo();
										this.props.showDashAndHideList();
									}}
							>
								<button className="field">Delete Comment</button>
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
										showDashAndHideList={this.props.showDashAndHideList} 
										showListAndHideDash={this.props.showListandHideDash}
									/>
								}
>>>>>>> parent of 53db93c... fixed list link to dashboard
							</form>
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
<<<<<<< HEAD
					<div className="form row" key={`restaurant-${i}`}>
						<div className="col-1-of-3">
							<h2 className="title">{restaurant.name}</h2>
						</div>
						<div className="col-2-of-3">
							<h3 className="subTitle">Google ID: {restaurant.place_id}</h3>
							<h3 className="subTitle">Posted By: {restaurant.userName}</h3>
							<h3 className="subTitle">{thisCommentList.length < 1 ? null : thisCommentList}</h3>
						</div>
=======
					<div className="form" key={`restaurant-${i}`}>
						<h2 className="row title">Restaurant: {restaurant.name}</h2><br/>
						<h3 className="col-1-of-3 subTitle">Google ID: {restaurant.place_id}</h3><br/>
						<h3 className="col-1-of-3 subTitle">Comments made by: {restaurant.userName}</h3><br/>
							{thisCommentList.length < 1 ? null : thisCommentList}
						<br/>
>>>>>>> parent of 53db93c... fixed list link to dashboard
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