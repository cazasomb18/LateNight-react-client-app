import React from 'react';

const AppTitle = (props) => {
	if (props.userName === ''){	
		return (
			<div className="form">
		        <h1 className="appTitle">
		        LateNightBytes
		        </h1>
			</div>
		)
	} else {
		return (
			<div className="form">
				<h1 className="appTitle">
					Welcome Back to LateNightBytes, {props.userName}!
				</h1>
			</div>
		)
	}
};

export default AppTitle;