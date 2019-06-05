import React from 'react'
// import Dashboard from '../Dashboard'

const RestaurantComment = (props) => {
		console.log(props);
		console.log(props.userComments.data);
		const userData = props.userComments.data;
		userData.map((comment, i) => {
		return(
			<div>
				<li key={i}>
					ID: {comment.restaurant_id}
				</li>
			</div>
		)
	})
};

export default RestaurantComment;