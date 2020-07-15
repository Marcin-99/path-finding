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
	    isVisited,
      handleMouseDown,
      handleMouseDragging,
      handleMouseUp
    } = this.props;

  	const className = isFinish ? 'node-finish' :
  		 		      isStart ? 'node-start' :
  		 		      isVisited ? 'node-visited' :
                isWall ? 'node-wall' :
  		 		      '';

    return (
      <div 
      	id={ 'node-' + row + '-' + column }
      	className={ 'node ' + className }
        onMouseDown={ () => handleMouseDown(column, row) }
        onMouseEnter={ () => handleMouseDragging(column, row) }
        onMouseUp={ () => handleMouseUp(column, row) }>
      </div>
    );
  }
}


export const DEFAULT_NODE = {
	row: 0,
	column: 0,
}