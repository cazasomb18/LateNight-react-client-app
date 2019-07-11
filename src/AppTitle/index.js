import React from 'react';

const AppTitle = (props) => {

	const arr = ['Welcome back to Munchopoulous, Friend!', 'Deliciousness and Insomnia await beyond!', 'Who\'s hungry!? Let\'s see Who\'s, meybe?'];
	const randInt = Math.floor(Math.random()*2);

	if (props.userName === ''){
		return (
			<div id="titleContainer" className="form">
		        <h1 className="appTitle">
		        Welcome to Late Night Bytes
		        </h1>
			</div>
		)
	} else {
		return (
			<div id="titleContainer" className="form">
				<h1 className="appTitle">
					Hi {props.userName}
				</h1>
				<h1 className="appTitle">
					{arr[randInt]}
				</h1>
			</div>
		)
	}
};

export default AppTitle;