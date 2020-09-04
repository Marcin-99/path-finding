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


export const animatePaths = (data) => {
    for (let i = 1; i < data.closed_path.length - 1; i++) {
    	if (i === data.closed_path.length - 2) {
    		setTimeout(() => {
    			manageChangingClassesOfNodesWithoutShortestPath(data.closed_path, data.shortest_path, 25, 'node')
    		}, 50 * i);

    		setTimeout(() => {
    			manageChangingClassesOfNodesAbdDirectionsOfArrows(data.shortest_path, 50, 'node node-shortest-path fas fa-arrow-')
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
				isStart: row === startNode.row && column === startNode.column,
				isFinish: row === finishNode.row && column === finishNode.column,
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


export const shortenUrl = (url) => {
	if (url.length > 110) return url.slice(0, 110) + " ...... " + url.slice(url.length - 30, url.length);
	return url;
}


const manageChangingClassesOfNodesWithoutShortestPath = (path, shortestPath, speed, classNames) => {
	for (let i = 1; i < path.length - 1; i++) {
		setTimeout(() => {
			const node = path[i].node;
			if (!checkIfNodeIsInThePath(node, shortestPath))
				document.getElementById('node-' + node.row + '-' + node.column).className = classNames;
		}, shortestPath.length / 8 * i);
	}
}


const manageChangingClassesOfNodesAbdDirectionsOfArrows = (path, speed, classNames) => {
	for (let i = 1; i < path.length - 1; i++) {
		let direction = "";
		if (path[i].node.column > path[i-1].node.column) direction = "right";
		else if (path[i].node.column < path[i-1].node.column) direction = "left";
		else if (path[i].node.row > path[i-1].node.row) direction = "down";
		else if (path[i].node.row < path[i-1].node.row) direction = "up";

		setTimeout(() => {
			const node = path[i].node;
			document.getElementById('node-' + node.row + '-' + node.column).className = classNames + direction;
		}, speed * i);
	}
}


const checkIfNodeIsInThePath = (node, path) => {
	for (let i = 0; i < path.length; i++) { 
		if (node.column === path[i].node.column && node.row === path[i].node.row) return true;
	}
	return false
}