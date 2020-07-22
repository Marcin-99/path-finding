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


export const animateNodesVisited = (data) => {
    for (let i = 0; i < data.closed_path.length; i++) {
    	if (i == data.closed_path.length - 1) {
    		setTimeout(() => {
	    		for (let j = 0; j < data.open_path.length; j++) {
					setTimeout(() => {
	        			const node = data.open_path[j].node;
	        			document.getElementById('node-' + node.row + '-' + node.column).className = 'node node-open';
	      			}, 25 * j);
	      		}}, 50 * i);

    		setTimeout(() => {
	    		for (let j = 0; j < data.shortest_path.length; j++) {
	      			setTimeout(() => {
		        		const node = data.shortest_path[j].node;
		        		document.getElementById('node-' + node.row + '-' + node.column).className = 'node node-shortest-path';
	      			}, 50 * j);
	    		}
    		}, 50 * i);
    	}
      	setTimeout(() => {
        	const node = data.closed_path[i].node;
        	document.getElementById('node-' + node.row + '-' + node.column).className = 'node node-visited';
      	}, 50 * i);
    };
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