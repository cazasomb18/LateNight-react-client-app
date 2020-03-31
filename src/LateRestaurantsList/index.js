import React from 'react';
import RenderList from '../RenderList';
import MapContainer from '../Map';


class LateRestaurantsList extends React.Component {
	constructor(props){
		super(props);
		this.getRestaurants.bind(this);
		this.state = {
			restaurants: [],
			resultLatLng: [],
			showList: false,
			showDash: false
			// isOpen: false
		}
	}

	componentDidMount(){
		// console.log("STATE CDM LateRestaurantsList: ", this.state);
		// console.log("PROPS CDM LateRestaurantsList: ", this.props);
	}

    getRestaurants = async (e) => {
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

            console.log("nearby restaurants response: ", response);

            this.setState({
                restaurants: response,
                resultLatLng: resultLatLng,
                showList: true
                // isOpen: true
            })

            this.props.showListAndHideDash();

        } catch(err) {
            console.log(err);
        }
    }

	toggleModal = (e) => {
		// e.preventDefault();
		if (this.state.showDash === false && this.state.showList === true) {
			this.setState({
				showDash: true,
				showList: false
		    })
		    this.props.showDashAndHideList();
		}
		if (this.state.showList === false && this.state.showDash === true) {
			this.setState({
				showList: true,
				showDash: false
			})
    		this.props.showListAndHideDash();
		}
	}

	render(){
		// console.log("STATE RENDER laterestaurantslist: ", this.state);
		// console.log("PROPS RENDER laterestaurantslist: ", this.props);

		return(
			<div className="lateList-container">
			{
				!this.state.showList && !this.state.isOpen ?
				<div className="lnbButtonContainer">
					<form 
						className="form" 
						onSubmit={(e) => {
							e.preventDefault();
							this.getRestaurants();
						}
					}>
						<input className="pulse-grow lnbButton field" type="submit" value="Find Late Bytes"/>
					</form>
				</div>

				: 

				<div>
					<RenderList 
						showListAndHideDash={this.props.showListAndHideDash} 
						showDashAndHideList={this.props.showDashAndHideList} 
						restaurants={this.state.restaurants}
						resultLatLng={this.state.resultLatLng} 
					/>
					<MapContainer
                		latitude={this.props.latitude}
                		longitude={this.props.longitude}
                		restaurants={this.state.restaurants}
              		/>
              		<div className="lnbButtonContainer">
						<button className="pulse-grow lnbButton field" type="button" onClick={(e)=>{this.toggleModal()}}>
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