import React from 'react';
import RenderList from '../RenderList';


class LateRestaurantsList extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			restaurants: [],
			showList: false,
			isOpen: false,
			latLng: {
				lat: this.props.latitude,
				lng: this.props.longitude
			}		
		}
	}
	getRestaurants = async (e) => {
		e.preventDefault();
		try {
			const geoLocURL = process.env.REACT_APP_GEO_URL + this.props.latitude + ',' + this.props.longitude + process.env.REACT_APP_GEO_FIELDS + process.env.REACT_APP_API_KEY;
			console.log(geoLocURL);
			const getRestaurantsResponse = await fetch(process.env.REACT_APP_BACK_END_URL + 'restaurants/nearby?searchTerm=' + this.props.latitude + ',' + this.props.longitude, {
				method: 'GET',
				credentials: 'include',
				headers: {
					'Content-Type': 'application/json'
				}
			})
			const parsedResponse = await getRestaurantsResponse.json();
			console.log(parsedResponse)
			const response = parsedResponse.data.results;
			console.log(response);
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
		console.log("this.props in render() in LateRestaurantList: ", this.props);
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