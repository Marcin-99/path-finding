import React from 'react';
import './Node.css';


const Node = (props) => {
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
    } = props;

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


export default Node;
