import React from 'react';
import Node from './Node/Node';
import './Visualizer.css';


class Visualizer extends React.Component {

	state = {
		nodes: []
	}

	componentDidMount() {
		const nodes = [];
		for (let row = 0; row < 10; row++) {
			const currentRow = [];
			for (let column = 0; column < 20; column++) {
				const currentNode = {
					column,
					row,
					isStart: row == 5 && column == 4,
					isFinish: row == 5 && column == 15,
				};
				currentRow.push(currentNode);
			}
			nodes.push(currentRow);
		}
		this.setState({nodes});
	}	

	render() {
	  return (
	    <div className="grid">
	      {this.state.nodes.map((row, rowId) => {
	      	return <div key={ rowId }>
	      		{row.map((node, nodeId) => {
	      			const {isStart, isFinish} = node;
	      			return (
	      				<Node key={ nodeId } isStart={ isStart } isFinish={ isFinish } test={ 'foo' } test={ 'kappa' } />
	      			)
	      		}
	      		)}
	      	</div>
	      })}
	    </div>
	  );
	 }
}


export default Visualizer;