import React from 'react';
import Node from './Node/Node';
import './Visualizer.css';
import {dijkstra, getNodesInShortestPathOrder} from '../utilities/dijkstra-path-finding-algorithm';
import {printWall, animatePaths, buildGrid} from './VisualizerUtilities';
import {urlsBuilder} from './UrlsBuilder/urlsBuilder';


const GRID = {width: 24, height: 24};
const START_NODE = {column: 0, row: 4};
const FINISH_NODE = {column: 23, row: 5};


class Visualizer extends React.Component {

	state = {
		nodes: [],
		mouseIsPressed: false,
		dataUrl: ""
	}

	componentDidMount() {
		const nodes = buildGrid(GRID, START_NODE, FINISH_NODE);
		this.setState({nodes});
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
  		let url = urlsBuilder(this.state.nodes, 'best-first', GRID, START_NODE, FINISH_NODE);

    	fetch(url)
      		.then(response => response.json())
      		.then((data) => {
      			animatePaths(data);
      		})
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
	  		<div className="buttons">
			  	<button onClick={ () => this.visualizeAlgorithm() }>
			  		Visualize Dijkstra
			  	</button>
			  	<button onClick={ () => this.visualizeBestFirst() }>
			  		Visualize Best First
			  	</button>
			</div>
			<div className="link">
				Link to the api with current state: { urlsBuilder(this.state.nodes, 'best-first', GRID, START_NODE, FINISH_NODE) }
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