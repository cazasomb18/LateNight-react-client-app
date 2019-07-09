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
		console.log('renderList state/props: ', this.state, this.props);
	}

	handleChange = (e) => {
		e.preventDefault();
	    this.setState({
	      [e.currentTarget.name]: e.target.value
	    })
	}

  	postRestaurantComments = async (e)  => {
		try{
  		e.preventDefault();
	        const postComments = await fetch(process.env.REACT_APP_BACK_END_URL + '/restaurants/' + this.state.targetRestaurant.place_id + '/comment/', {
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
	        // console.log("comment response in RestaurantComment async func: ", commentResponse);
	        await this.setState({
	          commentInput: JSON.stringify(commentResponse)
	        })
	        if (commentResponse.ok) {
	        	// console.log("we're about to run showDashAndHideList in postRestaurantComments");
	        	// console.log("props:");
	        	// console.log(this.props);
	        	// this.props.showDashAndHideList();
	        	{this.props.showDashAndHideList()};
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
		console.log("state in RenderList render(): ", this.state);
		console.log("props in RenderList render(): ", this.props);
		const restaurants = this.props.restaurants;
		const renderList = restaurants.map((restaurant, i) => {
		return(
			<form id="lateList" key={i}>
				<li>
					<h3 className="ol-subitems">Name: {restaurant.name}</h3><br/>
					<h3 className="ol-subitems">Address: {restaurant.vicinity}</h3><br/>
					<h3 className="ol-subitems">Google ID: {restaurant.place_id}</h3><br/>
					<button className="field" id={i} onClick={this.addCommentView}>Add Comment</button> 
				</li>
				<br/>
			</form>
		)
	})

		if (!this.state.addingComment) {
			return (
				<div className="form">
					<h4 className="subTitle text-secondary latelistTitle">LATE NIGHT LIST</h4>
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
						<input className="field" type='submit' value='POST COMMENT'/>
					</form>
				</div>
			)
		}
	}
}








export default RenderList;