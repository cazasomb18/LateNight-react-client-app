import React from 'react';
import RenderList from '../RenderList';



class LateRestaurantsList extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			restaurants: [],
			showList: false,
			isOpen: false		}
	}

	getRestaurants = async (e) => {
		e.preventDefault();
		try {
			const getRestaurantsResponse = await fetch(process.env.REACT_APP_BACK_END_URL + 'restaurants/', {
				method: 'GET',
				credentials: 'include',
				headers: {
					'Content-Type': ['Access-Control-Allow-Origin', 'Access-Control-Allow-Methods', 'Access-Control-Allow-Headers']
				}
			})
			const parsedResponse = await getRestaurantsResponse.json();
			console.log(parsedResponse)
			const response = parsedResponse.allRestaurants.results;
			this.setState({
				restaurants: response,
				showList: true
			})
		} catch(err) {
			console.error(err);
		}
	}
	toggleModal = () => {
		this.setState({
			isOpen: false
	    })
	}
	render(){
		console.log("this.state in render() in LateRestaurantList: ", this.state);
		return(
			<div>
			{
				!this.state.showList ?
				<form onSubmit={this.getRestaurants}>
					<h4 >ARE YOU HUNGRY?!</h4>
					<input type="submit" value="Find Late Bytes"/>
				</form>
				: null
			}
				{this.state.showList ? <RenderList restaurants={this.state.restaurants}/> : null}
			</div>
		);
	}
}

export default LateRestaurantsList;