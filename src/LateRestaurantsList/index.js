import React from 'react';
import RenderList from '../RenderList';
import MapContainer from '../Map';


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
	componentDidMount(){
		// console.log("this.state in CDM LateRestaurantsList: ", this.state);
		// console.log("this.props in CDM LateRestaurantsList: ", this.props);
	}
    getRestaurants = async (e) => {
        e.preventDefault();
        try {
            const getRestaurantsResponse = await fetch(process.env.REACT_APP_BACK_END_URL + '/restaurants/nearby?searchTerm=' + this.props.latitude + ',' + this.props.longitude, {
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
            this.props.showListAndHideDash();
        } catch(err) {
            console.error(err);
        }
    }
	toggleModal = () => {
		this.setState({
			isOpen: false,
			showList: false
	    })
	    this.props.showDashAndHideList();
	}
	render(){
		return(
			<div className="lateList-container">
			{
				!this.state.showList && !this.state.isOpen ?
				<div className="lnbButtonContainer">
					<form id="bottomE" className="form" onSubmit={this.getRestaurants}>
						<input className="lnbButton field" type="submit" value="Find Late Bytes"/>
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