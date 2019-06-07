import React from 'react'

const RestaurantComment = (props) => {

	console.log(props);
	const userData = props.userData;
	const userComments = props.userComments;


	const deleteRestaurantComment = async (restaurantPlaceId, commentId) => {
	    
	    console.log(props)

	    try{
			
	      	const deletedComment = await fetch(process.env.REACT_APP_BACK_END_URL + 'comment/restaurants/' + restaurantPlaceId + '/' + commentId, {
	        	method: 'DELETE',
	        	credentials: 'include'
		      })
		      
	      	console.log("unparsed deleted comment:")
	      	console.log(deletedComment)

		      const deletedCommentResponse = await deletedComment.json();
		      console.log(deletedCommentResponse);
		      if (deletedComment.ok) {
		      	console.log("are we doing this");
		      	props.getUserRestaurantInfo();
		      }

	    }catch(err){
	 		console.error(err)
		}
	}


	const restaurantList = userData.map((restaurant, i) => {
		

		const thisCommentListWithNulls = userComments.map((comment, j) => {
			if (comment.restaurant_id[0] === restaurant._id){
				return(
					<ul key={`comment-${j}`}>
						<p> {comment.commentBody}</p>
						<form onSubmit={
							(e) => { 
								e.preventDefault();
								deleteRestaurantComment(restaurant.place_id, comment._id);
							} 
						}>
							<button>Delete Comment</button>
						</form>
					</ul>
				);
			} 
			else {
				return null 
			}
		})
		const thisCommentList = thisCommentListWithNulls.filter((e) => e !== null )
		console.log(thisCommentList);
		return (

			<div key={`restaurant-${i}`}>
				<h2>Restaurant: {restaurant.name}</h2><br/>
				<h6>Google ID: {restaurant.place_id}</h6><br/>
				<h3> Comments made by: {restaurant.userName} </h3><br/>
					{thisCommentList}
				<br/>
			</div>
		);
	})


	return(
		<div>
			{restaurantList}
		</div>
	)
};

export default RestaurantComment;