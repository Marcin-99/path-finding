import React from 'react';
import { Link, NavLink, withRouter } from 'react-router-dom';


const NavBar = (props) => {
  return (
    <nav id="navBar">
        <a href="/visualizer">Path Finding Visualizer</a>
        <ul>
            <li><NavLink to="/tutorial">Tutorial</NavLink></li>
            <li><NavLink to="/visualizer">Visualizer</NavLink></li>
            <li><NavLink to="/mazes">Mazes</NavLink></li>
        </ul>
    </nav>
  );
}


export default withRouter(NavBar);

