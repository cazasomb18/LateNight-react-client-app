import React, { Component } from 'react';

///has to be a smart component??

class RenderListComponent extends React.Component{
	constructor(){
		super();
		this.state = {
			value: '',
			commentInput: ''
		} 

	}
	handleChange = (e) => {
		console.log(e.currentTarget)
		// console.log(e.currentTarget.commentInput);
	    e.preventDefault();
	    this.setState({
	      [e.target.name]: e.target.value
	    })
	}
	render(){ 
		const restaurants = this.props.restaurants;
		const renderList = restaurants.map((restaurant, i) => {
		return(
			<li key={i}>
				<form>
				<label>
					Name: <a href={'/faux'}> {restaurant.name}</a><br/>
					Address: {restaurant.vicinity}<br/>
					ID: {restaurant.place_id}<br/>
					{restaurants.forEach((i) => <textarea value={this.state.commentInput[i]} onChange={this.handleChange} name='commentInput'/>)}
					<input type='submit' value='comment'/>
				</label>
				</form>
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