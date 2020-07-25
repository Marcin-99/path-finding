import React from 'react';
import {BrowserRouter, Route} from 'react-router-dom';
import './App.css';
import Visualizer from './Components/ProjectVisualizer/Visualizer';
import NavBar from './Components/NavBar/navBar';
import Mazes from './Components/MazesPage/mazes';


function App() {
  return (
    <div className="App">
    	<BrowserRouter>
	    	<NavBar />
	    	<div id="content">
		      	<Route path="/visualizer" component={ Visualizer } />
		      	<Route path="/mazes" component={ Mazes } />
	      	</div>
      	</BrowserRouter>
    </div>
  );
}


export default App;
