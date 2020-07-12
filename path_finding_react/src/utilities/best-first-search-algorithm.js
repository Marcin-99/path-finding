//source:    https://www.mygreatlearning.com/blog/best-first-search-bfs/


export function bestFirst(grid, startNode, goalNode) {

	let pathFound = false; //this should be changed for true when the goalNode is moved to the closed list
	let currentNode = startNode;
	let unvisitedNeighbors = [];

	let open = [{
		Node: startNode,
	}];

	let closed = [{
		//Node: null,
		//parentNode: null
	}];

	while(open.length && pathFound == false) {
		unvisitedNeighbors = getUnvisitedNeighbors(startNode, grid, goalNode);
		console.log(unvisitedNeighbors);
		pathFound = true;
	}

}


function getUnvisitedNeighbors(node, grid, goalNode) {
  	const neighbors = [];
  	if (node.row > 0) neighbors.push(grid[node.row - 1][node.column]);
  	if (node.row < grid.length - 1) neighbors.push(grid[node.row + 1][node.column]);
  	if (node.column > 0) neighbors.push(grid[node.row][node.column - 1]);
  	if (node.column < grid[0].length - 1) neighbors.push(grid[node.row][node.column + 1]);

  	return neighbors.filter(neighbor => !neighbor.isVisited);
}


function getHeuristicValue(grid, node, goalNode) {
	let heuristic = Math.abs(goalNode.column - node.column) + Math.abs(goalNode.row - node.row);
	console.log(heuristic);
}



