import React from 'react'

const RestaurantComment = (props) => {
	console.log(props);
	console.log(props.userData);
	const userData = props.userData;
	console.log(userData);
	const commentList = userData.map((data, i) => {
		return(
			<li>
				<p>Comment: {data.commentBody}</p>
				<p>By: {data.commentAuthor}</p>
				<p>ID: {data.restaurant_id}</p>
				<p>Restaurant: {data.restaurant_name}</p>
			</li>
		);
	})


	return(
		<div>	
		{commentList}
		</div>
	)

};

export default RestaurantComment;