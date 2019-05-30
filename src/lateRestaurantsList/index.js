import React from 'react';
import RenderList from '../RenderList';
// import ShowModal from '../ShowModal';

class LateRestaurantsList extends React.Component {
	constructor(props){
		super();
		this.state = {
			restaurants: [],
			showList: false,
			isOpen: false,
		}
	}
	componentDidMount(){
		console.log("cdm - GetRestaurantIds Component: ", this.state, this.props);
	}
	handleClick = async (e) => {
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
			const getRestaurantsResponse = await fetch(process.env.REACT_APP_BACK_END_URL + 'restaurants', {

				method: 'GET',
				credentials: 'include',
				headers: {
					'Content-Type': 'application/json'
				}
			})
			const parsedResponse = await getRestaurantsResponse.json();
			console.log(parsedResponse) // object
			this.setState({
				restaurants: parsedResponse.allRestaurants.results, // 
				showList: true
			})

		} catch(err) {
			console.error(err);
		}
	}
	toggleModal = () => {
		this.setState({
			isOpen: !this.state.isOpen
	    });
	}
	render() {
		// this.props.history.push("/home")
		console.log("this.state in render() in LateRestaurantList: ", this.state);		
		return(
			<div>
				<h2>LATE RESTAURANTS LIST</h2>
				<form className="mb-2 mr-sm-2 mb-sm-0" onSubmit={this.getRestaurants}>
					<h4 className="mb-2 mr-sm-2 mb-sm-0">ARE YOU HUNGRY?!</h4>
					<input className="mr-sm-2" type="text" name="superfulous" placeholder="AWWW YEAAAAHHHH" onChange={this.handleChange}/><br/>
					<input className="mr-sm-2" type="submit" value="What's Open?!"/>
				</form>
				{this.state.showList ? <RenderList restaurants={this.state.restaurants}/> : null}
			</div>
		)
	}

}

export default LateRestaurantsList;