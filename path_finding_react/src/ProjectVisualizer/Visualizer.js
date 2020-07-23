import React from 'react';
import Node from './Node/Node';
import './Visualizer.css';
import {dijkstra, getNodesInShortestPathOrder} from '../utilities/dijkstra-path-finding-algorithm';
import {printWall, animatePaths, buildGrid} from './VisualizerUtilities';
import {urlsBuilder} from './UrlsBuilder/urlsBuilder';


class Visualizer extends React.Component {

	state = {
		nodes: [],
		grid: {},
		startNode: {},
		finishNode: {},
		mouseIsPressed: false,
		dataUrl: ""
	}


	componentDidMount = () => {
		this.handleStateChangesForResizingScreen();
		window.addEventListener("resize", (event) => {
			this.handleStateChangesForResizingScreen();
		})
	}


	handleStateChangesForResizingScreen = () => {
		let grid = {width: Math.floor(window.innerWidth/20) - 1, height: Math.floor(window.innerHeight/30)};
		let startNode = {column: 0, row: Math.floor(grid.height/2)};
		let finishNode = {column: grid.width - 1, row: Math.floor(grid.height/2)};

		console.log(finishNode);

		const nodes = buildGrid(grid, startNode, finishNode);
		this.setState({nodes});
		this.setState({grid});
		this.setState({startNode});
		this.setState({finishNode});
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
  		let url = urlsBuilder(this.state.nodes, 'best-first', this.state.grid, this.state.startNode, this.state.finishNode);

    	fetch(url)
      		.then(response => response.json())
      		.then((data) => {
      			animatePaths(data);
      		})
    }


  	visualizeBestFirst() {
  		const {nodes} = this.state;
  		const startNode = nodes[this.state.startNode.row][this.state.startNode.column];
  		const finishNode = nodes[this.state.finishNode.row][this.state.finishNode.column];
  		this.fetchBestFirst();
  	}


	render() {
	  return (
	  	<div>
	  		<div className="buttons">
			  	<button onClick={ () => this.visualizeAlgorithm() }>
			  		Visualize Dijkstra
			  	</button>
			  	<button onClick={ () => this.visualizeBestFirst() }>
			  		Visualize Best First
			  	</button>
			</div>
			<div className="link">
				Link to the api with current state: { urlsBuilder(this.state.nodes, 'best-first', this.state.grid, this.state.startNode, this.state.finishNode) }
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
	    </div>
	  );
	 }
}


export default Visualizer;