import React from 'react';
import Node from './Node/Node';
import './Visualizer.css';
import {dijkstra, getNodesInShortestPathOrder} from '../utilities/dijkstra-path-finding-algorithm';


const ROWS = 8;
const COLUMNS = 8;

const START_NODE_COL = 0;
const START_NODE_ROW = 4;

const FINISH_NODE_COL = 7;
const FINISH_NODE_ROW = 5;



class Visualizer extends React.Component {

	state = {
		nodes: [],
		closedPath: [],
		openPath: []
	}

	componentDidMount() {
		const nodes = [];
		for (let row = 0; row < ROWS; row++) {
			const currentRow = [];
			for (let column = 0; column < COLUMNS; column++) {
				const currentNode = {
					column,
					row,
					isStart: row == START_NODE_ROW && column == START_NODE_COL,
					isFinish: row == FINISH_NODE_ROW && column == FINISH_NODE_COL,
					distance: Infinity,
					isVisited: false,
					isWall: false,
					previousNode: null,
				};
				currentRow.push(currentNode);
			}
			nodes.push(currentRow);
		}
		this.setState({nodes});
	}	


	animateAlgorithm(visitedNodesInOrder, nodesInShortestPathOrder) {
		for (let i = 0; i <= visitedNodesInOrder.length; i++) {
      		if (i === visitedNodesInOrder.length) {
        	setTimeout(() => {
          		this.animateShortestPath(nodesInShortestPathOrder);
        	}, 10 * i);
        	return;
      		}
	      	setTimeout(() => {
	        	const node = visitedNodesInOrder[i];
	        	document.getElementById('node-' + node.row + '-' + node.column).className = 'node node-visited';
	      	}, 10 * i);
    	}
	}


	visualizeAlgorithm() {
	    const {nodes} = this.state;
	    const startNode = nodes[START_NODE_ROW][START_NODE_COL];
	    const finishNode = nodes[FINISH_NODE_ROW][FINISH_NODE_COL];
	    const visitedNodesInOrder = dijkstra(nodes, startNode, finishNode);
	    console.log(visitedNodesInOrder);
	    //const nodesInShortestPathOrder = getNodesInShortestPathOrder(finishNode);
	    //this.animateAlgorithm(visitedNodesInOrder, nodesInShortestPathOrder);
  	}


  	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


  	animateShortestPath = (path) => {
	    for (let i = 0; i < path.length; i++) {
	    	console.log(path[i]);
	      	setTimeout(() => {
	        const node = path[i].node;
	        document.getElementById('node-' + node.row + '-' + node.column).className = 'node node-shortest-path';
	      	}, 50 * i);
	    }
  	}


  	fetchBestFirst = () => {
  		console.log("fetching...");
  		let output;

    	fetch('http://127.0.0.1:8000/algorithms/best-first/width=8&height=8&start=0,4&goal=7,5&walls=1,5&1,7&2,5&2,7&3,5&3,7&4,4&4,5&4,7&5,4&5,7&6,5&6,6&6,7')
      		.then(response => response.json())
      		.then(data => this.animateShortestPath(data.closed_path))
    }


  	visualizeBestFirst() {
  		const {nodes} = this.state;
  		const startNode = nodes[START_NODE_ROW][START_NODE_COL];
  		const finishNode = nodes[FINISH_NODE_ROW][FINISH_NODE_COL];
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
		      				<Node key={ nodeId } column={ column } row={ row } isStart={ isStart } isFinish={ isFinish } isVisited={ isVisited } isWall={ isWall } />
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