export const printWall = (nodes, column, row) => {
	  	const newNodes = nodes.slice();
	  	const node = newNodes[row][column];
	  	const newNode = {
	    	...node,
	    	isWall: !node.isWall,
	  	};
	  	newNodes[row][column] = newNode;
	  	return newNodes;
	}


export const animateShortestPath = (path) => {
	    for (let i = 0; i < path.length; i++) {
	    	console.log(path[i]);
	      	setTimeout(() => {
	        const node = path[i].node;
	        document.getElementById('node-' + node.row + '-' + node.column).className = 'node node-shortest-path';
	      	}, 50 * i);
	    }
  	}


export const buildGrid = (grid, startNode, finishNode) => {
	let nodes = [];
	for (let row = 0; row < grid.height; row++) {
		const currentRow = [];
		for (let column = 0; column < grid.width; column++) {
			const currentNode = {
				column,
				row,
				isStart: row == startNode.row && column == startNode.column,
				isFinish: row == finishNode.row && column == finishNode.column,
				distance: Infinity,
				isVisited: false,
				isWall: false,
				previousNode: null,
			};
			currentRow.push(currentNode);
		}
		nodes.push(currentRow);
	}
	return nodes
}