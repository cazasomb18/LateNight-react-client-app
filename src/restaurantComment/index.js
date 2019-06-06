import React from 'react'

const RestaurantComment = (props) => {
	console.log(props);
	console.log(props.userData);
	console.log(props.userComments);
	const userData = props.userData;
	const userComments = props.userComments;
	console.log(userData);
	console.log(userComments);

	const restaurantList = userData.map((data, i) => {
		
		const thisCommentList = userComments.map((comment, i) => {
			if (comment.restaurant_id[0] === data._id){
				return(
						<ul key={`comment-${i}`}>
							<p> Comments: {comment.commentBody}</p>
							<button onClick={props.deleteComment}>DELETE</button>
						</ul>
				);
			}
		})
		return (

			<div key={`restaurant-${i}`}>
				<h2>Restaurant: {data.name}</h2>
				<h6>Google ID: {data.place_id}</h6><br/>
				<h3> Comments: </h3>
				{thisCommentList}
			</div>
		)

	})
	return(
		<div>	
		{restaurantList}
		</div>
	)
};

export default RestaurantComment;
	// const commentList = userComments.map((comment, i) => {
	// 	return(
	// 		<li key={i}>
	// 			<p>Comment: {comment.commentBody}</p>
	// 			<p>Posted By: {comment.commentAuthor}</p>
	// 		</li>
	// 	);
	// })
				// < button onClick={props.delete}>Delete Comment</button><br/>
				// <p>ID: {data.restaurant.id}</p>
				// <p>Restaurant: {data.restaurant_name}</p>