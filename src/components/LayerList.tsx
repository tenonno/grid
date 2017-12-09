import * as React from 'react';

import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';

import Divider from 'material-ui/Divider';

import Button from 'material-ui/Button';


import VisibilityIcon from 'material-ui-icons/Visibility';
import VisibilityOffIcon from 'material-ui-icons/VisibilityOff';


export interface Props {
}

import { ILayer, IState } from 'types/state';
import Layer from 'components/Layer';


import { ExpansionPanel, Typography, ExpansionPanelSummary, Paper } from 'material-ui';
import ExpandMoreIcon from 'material-ui-icons/ExpandMore';

import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';


// fake data generator
const getItems = (count: number) =>
	Array.from({ length: count }, (v, k) => k).map(k => ({
		id: `item-${k}`,
		content: `item ${k}`,
	}));

// a little function to help us with reordering the result
const reorder = (list: any, startIndex: any, endIndex: any) => {
	const result = Array.from(list);
	const [removed] = result.splice(startIndex, 1);
	result.splice(endIndex, 0, removed);

	return result;
};

// using some little inline style helpers to make the app look okay
const grid = 16;


const getItemStyle = (draggableStyle: any, isDragging: any) => ({
	// some basic styles to make the items look a bit nicer
	userSelect: 'none',

	// padding: grid * 2,
	margin: `0 0 ${grid}px 0`,

	// change background colour if dragging
	background: isDragging ? 'lightgreen' : 'grey',

	// styles we need to apply on draggables
	...draggableStyle,
});


const getListStyle = (isDraggingOver: any) => ({
	background: isDraggingOver ? 'lightblue' : 'lightgrey',
	padding: grid,
});


/**
 * Layer コンポーネント
 */
class LayerList extends React.Component<any> {

	constructor(props: any, context: any) {
		super(props, context);


		this.onDragEnd = this.onDragEnd.bind(this);

		this.state = {
			items: getItems(10),
		};

	}

	onDragEnd(result: any) {
		// dropped outside the list
		if (!result.destination) {
			return;
		}

		this.props.actions.reorderLayer({
			startIndex: result.source.index,
			endIndex: result.destination.index
		});

		console.warn('onDragEnd');

		/*

		const items = reorder(
			(this.state as any).items,
			result.source.index,
			result.destination.index
		);

		this.setState({
			items,
		});
		*/
	}

	render() {
		return (
			<div style={{}}>




				<DragDropContext onDragEnd={this.onDragEnd}>
					<Droppable droppableId="droppable">
						{(provided, snapshot) => (
							<div
								ref={provided.innerRef}
								style={getListStyle(snapshot.isDraggingOver)}
							>
								
								{this.props.layers.map((layer: ILayer, index: number) => (
									
									<Draggable key={index} draggableId={layer.name + index}>

										{(provided, snapshot) => (



											<div>


												<div
													ref={provided.innerRef}
													style={getItemStyle(
														provided.draggableStyle,
														snapshot.isDragging
													)}
													{...provided.dragHandleProps}
												>


														<Layer key={index} name={layer.name} visibility={layer.visibility} layer={layer} selected={this.props.currentLayerIndex === index} />



												</div>

												{provided.placeholder}
											</div>
										)}
									</Draggable>
								))}
								{provided.placeholder}
							</div>
						)}
					</Droppable>
				</DragDropContext>





			</div>

		);
	}
};





import connect from 'utils/connect';

export default connect(LayerList, (state: IState) => ({
	layers: state.layers
}), {});