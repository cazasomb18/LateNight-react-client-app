import React from 'react';

const AppTitle = (props) => {
	const name = props.userName
	return (
		<div>
	        <h1 className="AppTitle">
	        Late Night Bites
	        </h1>
		</div>
	)
	
};

export default AppTitle;

 // {this.state.loggedIn ? ({name = userName})