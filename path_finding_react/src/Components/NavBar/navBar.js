import React from 'react';
import {NavLink, withRouter} from 'react-router-dom';
import './navBar.css';


const NavBar = (props) => {

	if (document.getElementById("check") != null) document.getElementById("check").checked = false;

	return (
		<nav>
			<input type="checkbox" id="check"/>
			<label htmlFor="check" className="checkBtn">
				<i className="fas fa-bars"></i>
			</label>
		    <label className="logo">Path Finding Visualizer</label>
		    <ul id="navBar">
		        <li><NavLink to="/tutorial">Tutorial</NavLink></li>
		        <li><NavLink to="/visualizer">Visualizer</NavLink></li>
		        <li><NavLink to="/mazes">Mazes</NavLink></li>
		    </ul>
		</nav>
	);
}


export default withRouter(NavBar);

