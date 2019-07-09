import React from 'react';

const AppTitle = (props) => {
	if (props.userName === ''){	
		return (
			<div id="titleContainer" className="form bg-transparent">
		        <h1 className="appTitle bg-transparent">
		        LateNightBytes
		        </h1>
			</div>
		)
	} else {
		return (
			<div id="titleContainer" className="form">
				<h1 className="appTitle">
					Welcome Back to LateNightBytes!
				</h1>
			</div>
		)
	}
};

export default AppTitle;