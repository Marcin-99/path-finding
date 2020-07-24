export let urlsBuilder = (nodes, algorithm, grid, startNode, finishNode) => {
	let walls = '';

	for (let row = 0; row < nodes.length; row++) {
		const currentRow = [];
		for (let column = 0; column < nodes[row].length; column++) {
			if (nodes[row][column].isWall) walls += column + ',' + row + '&';
		}
	}

	walls = walls.slice(0, -1);

	let url = 'http://127.0.0.1:8000/algorithms/' + algorithm + '/' +
		'width=' + grid.width +
		'&height=' + grid.height + 
		'&start=' + startNode.column + ',' + startNode.row + 
		'&goal=' + finishNode.column + ',' + finishNode.row +
		'&walls=' + walls
		
	return url;
}