import React from 'react';

class RenderList extends React.Component {
	constructor(){
		super();
		this.state = {
			commentInput: '',
			addingComment: false,
			targetRestaurant: null
		}
	}
	componentDidMount(){
		// console.log('renderList state/props: ', this.state, this.props);
	}

	handleChange = (e) => {
	    this.setState({
	      [e.currentTarget.name]: e.target.value
	    })
	}

  	postRestaurantComments = async (e)  => {
		e.preventDefault();
		console.log("P R C");
		try{
	        const postComments = await fetch(process.env.REACT_APP_PYTHON_BACKEND_URL + 'restaurants/' + this.state.targetRestaurant.place_id + '/comment', {
	          method: 'POST',
	          credentials: 'include',
	          body: JSON.stringify({
	          	commentAuthor: this.props.userName,
	          	commentBody: this.state.commentInput,
	          	restaurant_name: this.state.targetRestaurant.name,
	          	name: this.state.targetRestaurant.name,
	          	address: this.state.targetRestaurant.vicinity,
	          	place_id: this.state.targetRestaurant.place_id
	          }),
	          headers: {
	            'Content-Type': 'application/json'
	          }
	        })
	        const commentResponse = await postComments.json();
	        console.log(commentResponse);
	        console.log("this is the comment response: ", commentResponse);
	        await this.setState({
	          commentInput: JSON.stringify(commentResponse)
	        })
	        if (commentResponse.ok) {
	        	console.log("we're about to run showDashAndHideList in postRestaurantComments");
	        	console.log("props:");
	        	console.log(this.props);
	        	this.props.showDashAndHideList();
	        }
	    }catch(err){
	        console.error(err)
      	}
  	}
	addCommentView = async (e) => {
		e.preventDefault();
		this.setState({
			addingComment: true,
			targetRestaurant: this.props.restaurants[e.currentTarget.id]
		});

	}
	render(){ 
		// console.log("here is props, we are looking for get user getUserRestaurantInfo");
		// console.log(this.props);
		// console.log(this.state);
		const restaurants = this.props.restaurants;
		console.log(restaurants);
		const renderList = restaurants.map((restaurant, i) => {
		return(
			<li key={i}>
				<form className="form">
					Name: {restaurant.name}<br/>
					Address: {restaurant.vicinity}<br/>
					ID: {restaurant.place_id}<br/>
					<button className="field" id={i} onClick={this.addCommentView}>Add Comment </button> 
				</form>
			</li>
		)
	})

		if (!this.state.addingComment) {
			return (
				<div className="form">
					<h4 className="subTitle">LATE NIGHT BYTES LIST</h4> 
					<ul className="form">
					{renderList}
					</ul>
				</div>
			)
		} else {
			return (
				<div className="form">
					<form className="form" onSubmit={this.postRestaurantComments}>
						Name:<input className="field" readOnly name="name" value={this.state.targetRestaurant.name}></input><br/>
						Address: <input className="field" readOnly name="address" value={this.state.targetRestaurant.vicinity}></input><br/>
						ID: <input className="field" readOnly name="place_id" value={this.state.targetRestaurant.place_id}></input><br/>
						<textarea className="field" onChange={this.handleChange} name='commentInput'/>
						<input className="field" type='submit' value='comment'/>
					</form>
				</div>
			)
		}
	}
}








export default RenderList;