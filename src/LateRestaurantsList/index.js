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
			showDash: false
		}
	}

	componentDidMount(){

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

            const response = await parsedResponse.data.results;

            const resultLatLng = parsedResponse.resultLatLng;

            this.setState({
                restaurants: response,
                isOpen: true,
                showList: true
            })

            this.props.showListAndHideDash();
        } catch(err) {
            console.log(err);
        }
    }

	toggleModal = (e) => {
		if (this.state.showDash === false && this.state.showList === true) {
			this.setState({
				isOpen: false,
				showList: false
		    })
		    this.props.showListAndHideDash();

		} else {
			this.setState({
				isOpen: true,
				showList: false
			})
		}
	    this.props.showDashAndHideList();
	}

	render(){
		// console.log("STATE RENDER laterestaurantslist: ", this.state);
		// console.log("PROPS RENDER laterestaurantslist: ", this.props);
		return(
			<div className="lateList-container">
			{
				!this.state.showList && !this.state.isOpen ?
				<div className="lnbButtonContainer">
					<form className="form" onSubmit={this.getRestaurants}>
						<input className="hvr-grow lnbButton field" type="submit" value="Find Late Bytes"/>
					</form>
				</div>

				: 

				<div>
				
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
              		<div className="lnbButtonContainer">
						<button className="lnbButton field" type="button" onClick={this.toggleModal}>
							Go to Dashboard
						</button>
              		</div>
				</div>
			
			}

			</div>
		);
	}
}

export default LateRestaurantsList;