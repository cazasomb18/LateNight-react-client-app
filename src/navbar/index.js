import React from 'react';
import { Link } from 'react-router-dom';



const Header = () => {

	return (
		<header className="header"> 
			<div className="header-container header-expand-lg header-dark bg-dark">
				<Link to='/home'><h2 className=" home home-expand-md home-light bg-dark">Home</h2> </Link> <br/>
				<Link to='/register'><h2 className=" register register-expand-md register-light bg-dark">Register</h2> </Link> <br/>
				<Link to='/restaurants'><h2 className=" restaurants restaurants-expand-md restaurants-light bg-dark">Restaurants</h2> </Link> <br/>
				<Link to='/comment'><h2 className=" comment comment-expand-md comment-light bg-dark">Comment</h2> </Link> <br/>
				<Link to='/login'><h2 className=" login login-expand-md login-light bg-dark">Login</h2> </Link> <br/>
			</div>
		</header>

		)
}

export default Header;