import React from 'react';
import './Node.css';


export default class Node extends React.Component {
  render() {
  	const {
	    column,
	    row,
	    isFinish,
	    isStart,
	    isWall,
	    isVisited
    } = this.props;

  	const className = isFinish ? 'node-finish' :
  		 		      isStart ? 'node-start' :
  		 		      isVisited ? 'node-visited' :
  		 		      '';

    return (
      <div 
      	id={ 'node-' + row + '-' + column }
      	className={ 'node ' + className }>
      </div>
    );
  }
}


export const DEFAULT_NODE = {
	row: 0,
	column: 0,
}