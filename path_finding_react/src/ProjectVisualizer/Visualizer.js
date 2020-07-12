import React from 'react';
import Node from './Node/Node';
import './Visualizer.css';
import {dijkstra, getNodesInShortestPathOrder} from '../utilities/dijkstra-path-finding-algorithm';
import {bestFirst} from '../utilities/best-first-search-algorithm';


const START_NODE_ROW = 1;
const START_NODE_COL = 3;

const FINISH_NODE_ROW = 2;
const FINISH_NODE_COL = 0;



class Visualizer extends React.Component {

	state = {
		nodes: []
	}

	componentDidMount() {
		const nodes = [];
		for (let row = 0; row < 3; row++) {
			const currentRow = [];
			for (let column = 0; column < 4; column++) {
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
	    const nodesInShortestPathOrder = getNodesInShortestPathOrder(finishNode);
	    this.animateAlgorithm(visitedNodesInOrder, nodesInShortestPathOrder);
  	}


  	animateShortestPath(nodesInShortestPathOrder) {
	    for (let i = 0; i < nodesInShortestPathOrder.length; i++) {
	      	setTimeout(() => {
	        const node = nodesInShortestPathOrder[i];
	        document.getElementById('node-' + node.row + '-' + node.column).className = 'node node-shortest-path';
	      	}, 50 * i);
	    }
  	}

  	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


  	visualizeBestFirst() {
  		const {nodes} = this.state;
  		const startNode = nodes[START_NODE_ROW][START_NODE_COL];
  		const finishNode = nodes[FINISH_NODE_ROW][FINISH_NODE_COL];
  		const visitedNodesInOrder = bestFirst(nodes, startNode, finishNode);
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