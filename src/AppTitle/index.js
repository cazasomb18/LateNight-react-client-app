import React from 'react';

const AppTitle = (props) => {
	if (props.userName === ''){	
		return (
			<div>
		        <h1 className="appTitle">
		        LateNightBytes
		        </h1>
			</div>
		)
	} else {
		return (
			<div>
				<h1>
					Welcome Back {props.userName}!
				</h1>
			</div>
		)
	}
};

export default AppTitle;