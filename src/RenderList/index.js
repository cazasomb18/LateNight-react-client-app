import React from 'react';


class RenderList extends React.Component {
	constructor(props){
		super();
		this.state = {
			commentInput: '',
			addingComment: false,
			targetRestaurant: null,
			showList: false,
			showDash: false,
		}
	}
	componentDidMount(){
		console.log("renderList STATE: ", this.state);
		console.log("renderList PROPS: ", this.props);
	}

	handleChange = (e) => {
		e.preventDefault();
	    this.setState({
	      [e.currentTarget.name]: e.currentTarget.value
	    })
	}

  	postRestaurantComments = async (e)  => {
  		// e.preventDefault();
		try{
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

	        this.setState({
	        await this.setState({
	          commentInput: JSON.stringify(commentResponse)
	        })
	        if (commentResponse.ok) {
	        	// console.log("we're about to run showDashAndHideList in postRestaurantComments");
	        	// console.log("props:");
	        	// console.log(this.props);
	        	this.props.showDashAndHideList();
	        // console.log("comment response in RestaurantComment async func: ", commentResponse);

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

			<form key={i} className="row">
				<h2 className="col-1-of-3 list-subtitle">{restaurant.name}</h2>
				<h3 className="col-2-of-3 ul-subitems">Address: {restaurant.vicinity}</h3><br/>
				<h3 className="col-2-of-3 ul-subitems">Google-ID: {restaurant.place_id}</h3><br/>
				<button className= "listBtn" id={i} onClick={this.addCommentView}>Add Comment</button> 
			</form>
		)
	})

		if (!this.state.addingComment) {
			return (
				<div className="form">
					<h4 className="title lateListTitle">LATE NIGHT LIST</h4>
					<ul className="form">
					{renderList}
					</ul>
				</div>
			)
		} else {
			return (
				<div className="form">
					<form className="form" onSubmit={ (e) => {
						this.postRestaurantComments();
						this.props.showDashAndHideList();
					}
				}>
						Name:<input className="field" readOnly name="name" value={this.state.targetRestaurant.name}></input><br/>
						Address: <input className="field" readOnly name="address" value={this.state.targetRestaurant.vicinity}></input><br/>
						ID: <input className="field" readOnly name="place_id" value={this.state.targetRestaurant.place_id}></input><br/>
						<textarea className="field" onChange={this.handleChange} name='commentInput' placeholder="make comment here"/>
						<input className="field" type='submit' value='POST COMMENT'/>
					</form>
				</div>
			)
		}
	}
}








export default RenderList;