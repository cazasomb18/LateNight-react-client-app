import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {

	return (
		<header> 
			<div className="header header-expand-lg header-dark bg-dark">
				<Link to='/register'><h2 className=" register register-expand-md register-light bg-dark">Register</h2> </Link> <br/>
				<Link to='/login'><h2 className=" login login-expand-md login-light bg-dark">Login / Logout</h2> </Link> <br/>
			</div>
		</header>

		)
}

export default Header;