import React, { Component } from 'react';
import RenderList from '../RenderList';
import MapContainer from '../Map';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';


class LateRestaurantsList extends React.Component {
	constructor(props){
		super(props);
		this.getRestaurants.bind(this);
		this.state = {
			restaurants: [],
			showList: false,
			isOpen: false
		}
	}
	getRestaurants = async (e) => {
		e.preventDefault();
		try {
			const getRestaurantsResponse = await fetch(process.env.REACT_APP_BACK_END_URL + 'restaurants/nearby?searchTerm=' + this.props.latitude + ',' + this.props.longitude, {
				method: 'GET',
				credentials: 'include',
				headers: {
					'Content-Type': 'application/json'
				}
			})
			const parsedResponse = await getRestaurantsResponse.json();
			// console.log(parsedResponse)
			const response = parsedResponse.data.results;
			// console.log(response);
			this.setState({
				restaurants: response,
				isOpen: true,
				showList: true
			})
		} catch(err) {
			console.error(err);
		}
	}
	toggleModal = () => {
		this.setState({
			isOpen: false,
			showList: false
	    })
	}
	render(){
		console.log("this.state in render() in LateRestaurantList: ", this.state);
		console.log("this.props in render() in LateRestaurantList: ", this.props);
		return(
			<div>
			{
				!this.state.showList && !this.state.isOpen ?
				<div>
					<form className="form" onSubmit={this.getRestaurants}>
						<h4 className="field" >ARE YOU HUNGRY?!</h4>
						<input className="field" type="submit" value="Find Late Bytes"/>
					</form>

				</div>

				: 

				<div>
					<button className="field" type="button" onClick={this.toggleModal}>
						Close List
					</button>
					<RenderList 
						showListAndHideDash={this.props.showListAndHideDash} 
						showDashAndHideList={this.props.showDashAndHideList} 
						restaurants={this.state.restaurants}
					/>

					<MapContainer
                		latitude={this.props.latitude}
                		longitude={this.props.longitude}
                		restaurants={this.state.restaurants}
              		/>

					<button className="field" type="button" onClick={this.toggleModal}>
						Close List
					</button>
				</div>	

			
			}

			</div>
		);
	}
}

export default LateRestaurantsList;