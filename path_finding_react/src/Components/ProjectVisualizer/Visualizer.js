import React from 'react';
import Node from './Node/Node';
import './Visualizer.css';
import {printWall, animatePaths, buildGrid, shortenUrl} from './VisualizerUtilities';
import {buildRequestData} from './requestBuilder/requestBuilder';
import {getCookie} from '../projectUtilities';


class Visualizer extends React.Component {

	state = {
		nodes: [],
		grid: {},
		startNode: {},
		finishNode: {},
		mouseIsPressed: false,
		showLink: false
	}


	componentDidMount = () => {
		this.handleStateChangesForResizingScreen();
		window.addEventListener("resize", (event) => {
			this.handleStateChangesForResizingScreen();
		})
	}


	handleStateChangesForResizingScreen = () => {
		this.clearClassNames();
		let grid = {width: Math.floor(window.innerWidth/20), height: Math.floor(window.innerHeight/30)};
		let startNode = {column: 0, row: Math.floor(grid.height/2)};
		let finishNode = {column: grid.width - 1, row: Math.floor(grid.height/2)};
		const nodes = buildGrid(grid, startNode, finishNode);
		this.setState({nodes, grid, startNode, finishNode});
	}


	clearBoard = () => {
		this.clearClassNames();
		this.handleStateChangesForResizingScreen();
	}


	clearClassNames = () => {
		for (let row = 0; row < this.state.grid.height; row++)
			for (let column = 0; column < this.state.grid.width; column++) {
				let nodeClassName = document.getElementById('node-' + row + '-' + column).className;
				if (nodeClassName.includes('fas fa-arrow-'))
					document.getElementById('node-' + row + '-' + column).className = 'node';
			}
	}


	handleMouseDown = (column, row) => {
		const newNodes = printWall(this.state.nodes, column, row);
		this.setState({nodes: newNodes, mouseIsPressed: true});
	}


	handleMouseDragging = (column, row) => {
		if (!this.state.mouseIsPressed) return;
		const newNodes = printWall(this.state.nodes, column, row);
		this.setState({nodes: newNodes})
	}


	handleMouseUp = (column, row) => {
		this.setState({mouseIsPressed: false});
	}


  	fetchBestFirst = () => {
  		let postData = buildRequestData(this.state.nodes, 'best-first', this.state.grid, this.state.startNode, this.state.finishNode);

  		fetch('http://127.0.0.1:8000/algorithms/best-first', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': getCookie('csrftoken'),
          },
          body: JSON.stringify(postData)
        })
        .then(response => response.json())
        .then(data => { animatePaths(data) })
        .catch(error => console.error(error))
    }


    hideLink = (e) => {
    	let showLink = !this.state.showLink;
    	this.setState({showLink})
    	if (this.state.showLink === true) document.getElementById('link').style.display = 'none';
    	else document.getElementById('link').style.display = 'inline-block';
    }


    saveMazeLayout = () => {
    	fetch('http://127.0.0.1:8000/mazes/save', {
        	method: 'POST',
        	headers: {
         		'Content-Type': 'application/json',
         		'X-CSRFToken': getCookie('csrftoken'),
          	},
          	body: JSON.stringify(this.state.nodes)
        })
        .then(data => data.json())
        .then(data => { console.log(data) })
        .catch(error => console.error(error))
    }


	render() {
		let dataUrl = JSON.stringify(buildRequestData(this.state.nodes, 'best-first', this.state.grid, this.state.startNode, this.state.finishNode));

		return (
			<div>
				<div id="link">
					{ shortenUrl(dataUrl) }
					<i onClick={ () => {navigator.clipboard.writeText(dataUrl)} } className="fas fa-link copyLink">Copy all data</i>
				</div>
			    <div className="grid">
			      {this.state.nodes.map((row, rowId) => {
			      	return <div key={ rowId }>
			      		{row.map((node, nodeId) => {
			      			const {row, column, isFinish, isStart, isWall, isVisited} = node;
			      			return (
			      				<Node
				      				key={ nodeId }
				      				column={ column }
				      				row={ row } 
				      				isStart={ isStart } 
				      				isFinish={ isFinish } 
				      				isVisited={ isVisited } 
				      				isWall={ isWall } 
				      				handleMouseDown={ this.handleMouseDown }
				      				handleMouseDragging={ this.handleMouseDragging }
				      				handleMouseUp={ this.handleMouseUp }/>
			      			)
			      		}
			      		)}
			      	</div>
			      })}
			    </div>
			    <div className="buttons">
				  	<button className="btn">
				  		Visualize Dijkstra
				  	</button>
				  	<button className="btn" onClick={ this.fetchBestFirst }>
				  		Visualize Best First
				  	</button>
				  	<button className="btn" onClick={ this.clearBoard }>
				  		Clear board
				  	</button>
				  	<button className="btn" onClick={ this.saveMazeLayout }>
				  		Save maze
				  	</button>
				</div>
				<input type="checkbox" id="checkForLink" onChange={ this.hideLink } checked={ this.state.showLink }/>
				<label htmlFor="checkForLink" className="linkLabel" >Show body of the api request</label>
			</div>
		);
	 }
}


export default Visualizer;