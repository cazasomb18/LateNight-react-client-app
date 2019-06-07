import React from 'react';

const AppTitle = (props) => {
	console.log("APPTITLE PROPS: ", props);
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
					Welcome to LateNightBytes {props.userName}
				</h1>
			</div>
		)
	}
};

export default AppTitle;