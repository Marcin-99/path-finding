import React from 'react';
import Node from './Node/Node';
import './Visualizer.css';
import {printWall, animatePaths, buildGrid, shortenUrl} from './VisualizerUtilities';
import {urlsBuilder} from './UrlsBuilder/urlsBuilder';


class Visualizer extends React.Component {

	state = {
		nodes: [],
		grid: {},
		startNode: {},
		finishNode: {},
		mouseIsPressed: false,
		showLink: false
	}


	componentDidMount = () => {
		this.handleStateChangesForResizingScreen();
		window.addEventListener("resize", (event) => {
			this.handleStateChangesForResizingScreen();
		})
	}


	handleStateChangesForResizingScreen = () => {
		let grid = {width: Math.floor(window.innerWidth/20) - 1, height: Math.floor(window.innerHeight/30)};
		let startNode = {column: 0, row: Math.floor(grid.height/2)};
		let finishNode = {column: grid.width - 1, row: Math.floor(grid.height/2)};
		const nodes = buildGrid(grid, startNode, finishNode);
		this.setState({nodes, grid, startNode, finishNode});
	}


	handleMouseDown = (column, row) => {
		const newNodes = printWall(this.state.nodes, column, row);
		this.setState({nodes: newNodes, mouseIsPressed: true});
	}


	handleMouseDragging = (column, row) => {
		if (!this.state.mouseIsPressed) return;
		const newNodes = printWall(this.state.nodes, column, row);
		this.setState({nodes: newNodes})
	}


	handleMouseUp = (column, row) => {
		this.setState({mouseIsPressed: false});
	}


  	fetchBestFirst = () => {
  		let url = urlsBuilder(this.state.nodes, 'best-first', this.state.grid, this.state.startNode, this.state.finishNode);

    	fetch(url)
      		.then(response => response.json())
      		.then((data) => {
      			animatePaths(data);
      		})
    }


    hideLink = (e) => {
    	let showLink = !this.state.showLink;
    	this.setState({showLink})
    	if (this.state.showLink == true) document.getElementById('link').style.display = 'none';
    	else document.getElementById('link').style.display = 'inline-block';
    }


	render() {
		let dataUrl = urlsBuilder(this.state.nodes, 'best-first', this.state.grid, this.state.startNode, this.state.finishNode)

		return (
			<div>
				<div id="link">
					{ shortenUrl(dataUrl) }
					<i onClick={ () => {navigator.clipboard.writeText(dataUrl)} } className="fas fa-link copyLink">Copy link</i>
				</div>
			    <div className="grid">
			      {this.state.nodes.map((row, rowId) => {
			      	return <div key={ rowId }>
			      		{row.map((node, nodeId) => {
			      			const {row, column, isFinish, isStart, isWall, isVisited} = node;
			      			return (
			      				<Node
				      				key={ nodeId }
				      				column={ column }
				      				row={ row } 
				      				isStart={ isStart } 
				      				isFinish={ isFinish } 
				      				isVisited={ isVisited } 
				      				isWall={ isWall } 
				      				handleMouseDown={ this.handleMouseDown }
				      				handleMouseDragging={ this.handleMouseDragging }
				      				handleMouseUp={ this.handleMouseUp }/>
			      			)
			      		}
			      		)}
			      	</div>
			      })}
			    </div>
			    <div className="buttons">
				  	<button className="algorithmButton">
				  		Visualize Dijkstra
				  	</button>
				  	<button className="algorithmButton" onClick={ this.fetchBestFirst }>
				  		Visualize Best First
				  	</button>
				  	<button className="algorithmButton" onClick={ this.handleStateChangesForResizingScreen }>
				  		Clear Board
				  	</button>
				</div>
				<input type="checkbox" id="checkForLink" onChange={ this.hideLink } checked={ this.state.showLink }/>
				<label htmlFor="checkForLink" className="linkLabel" >Show link to api</label>
			</div>
		);
	 }
}


export default Visualizer;