import React from 'react';
import RenderList from '../RenderList';



class LateRestaurantsList extends React.Component {
	constructor(props){
		super();
		this.state = {
			restaurants: [],
			showList: false,
			isOpen: false
		}
	}
	
	componentDidMount(){
		console.log("cdm - LateRestaurantsList Component: ", this.state, this.props);
	}

	handleClickRestaurants = async (e) => {
		e.preventDefault();
		try{
			await this.getRestaurants();

		} catch(err){
			console.error(err);
		}
	}
	getRestaurants = async (e) => {
		e.preventDefault();
		try {
			const getRestaurantsResponse = await fetch(process.env.REACT_APP_BACK_END_URL + 'restaurants/', {

				method: 'GET',
				credentials: 'include',
				headers: {
					'Content-Type': ['Access-Control-Allow-Origin', 'Access-Control-Allow-Methods', 'Access-Control-Allow-Headers']
					// 'Content-Type': 'Access-Control-Allow-Methods',
					// 'Content-Type': 'Access-Control-Allow-Headers'
				}
			})
			console.log(getRestaurantsResponse);
			const parsedResponse = await getRestaurantsResponse.json();
			console.log(parsedResponse) // object
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
				
				<form className="mb-2 mr-sm-2 mb-sm-0" onSubmit={this.getRestaurants}>
					<h4 className="mb-2 mr-sm-2 mb-sm-0">ARE YOU HUNGRY?!</h4>
					<input className="mr-sm-2" type="submit" value="Find Late Bytes"/>
				</form>
				{this.state.showList ? <RenderList restaurants={this.state.restaurants}/> : null}
			</div>
		)
	}

}

export default LateRestaurantsList;