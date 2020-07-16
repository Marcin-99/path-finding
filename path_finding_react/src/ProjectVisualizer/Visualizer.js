import React from 'react';
import Node from './Node/Node';
import './Visualizer.css';
import {dijkstra, getNodesInShortestPathOrder} from '../utilities/dijkstra-path-finding-algorithm';
import {printWall, animateShortestPath, buildGrid} from './VisualizerUtilities';


const GRID = {width: 8, height: 8};
const START_NODE = {column: 0, row: 4};
const FINISH_NODE = {column: 7, row: 5};


class Visualizer extends React.Component {

	state = {
		nodes: [],
		closedPath: [],
		openPath: [],
		mouseIsPressed: false
	}

	componentDidMount() {
		const nodes = buildGrid(GRID, START_NODE, FINISH_NODE);
		this.setState({nodes});
	}


	handleMouseDown = (column, row) => {
		console.log("lul");
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
  		console.log("fetching...");
  		let output;

    	fetch('http://127.0.0.1:8000/algorithms/best-first/width=8&height=8&start=0,4&goal=7,5&walls=1,5&1,7&2,5&2,7&3,5&3,7&4,4&4,5&4,7&5,4&5,7&6,5&6,6&6,7')
      		.then(response => response.json())
      		.then(data => animateShortestPath(data.closed_path))
    }


  	visualizeBestFirst() {
  		const {nodes} = this.state;
  		const startNode = nodes[START_NODE.row][START_NODE.column];
  		const finishNode = nodes[FINISH_NODE.row][FINISH_NODE.column];
  		this.fetchBestFirst();
  	}


	render() {
	  return (
	  	<div>
		  	<button onClick={ () => this.visualizeAlgorithm() }>
		  		Visualize Dijkstra
		  	</button>
		  	<button onClick={ () => this.visualizeBestFirst() }>
		  		Visualize Best First
		  	</button>
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