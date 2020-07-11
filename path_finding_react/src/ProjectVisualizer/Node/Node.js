import React from 'react';
import './Node.css';


export default class Node extends React.Component {
  render() {
  	const {isFinish, isStart, test} = this.props;
  	
  	const className = isFinish ? 'node-finish' :
  		 		      isStart ? 'node-start' :
  		 		      '';

    return (
      <div className={ 'node ' + className }></div>
    );
  }
}


export const DEFAULT_NODE = {
	row: 0,
	column: 0,
}