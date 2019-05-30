import React from 'react';

///has to be a smart component??

const RenderListComponent = (props) => {
	const restaurants = props.restaurants;
	const renderList = restaurants.map((restaurant, i) => {
		return(
			<li key={i}>
				Name: <a href={'/faux'}> {restaurant.name}</a><br/>
				Address: {restaurant.vicinity}<br/>
				ID: {restaurant.place_id}<br/>
				<button>
				comment
				</button><br/>
			</li>
		)

	})
		return (
			<div className='renderList'>
				This is the RenderList Component that renders API data 
				<ul>
				{renderList}
				</ul>
			</div>
		)
}

	///this is the method to open/close modal
	// const toggleModal = () => {
	// 	this.props.onClose
 //    	this.setState({
 //      		isOpen: !this.state.isOpen
 //    	});
 //  	}
  	///// on click of <li> <a> tag.....
  	// onClick={new ShowModal.this.setState({isOpen: true})}













export default RenderListComponent;