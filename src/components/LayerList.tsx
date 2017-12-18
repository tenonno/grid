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


import { ExpansionPanel, Typography, ExpansionPanelSummary, Paper, Card, IconButton } from 'material-ui';
import ExpandMoreIcon from 'material-ui-icons/ExpandMore';

import { DragDropContext, Droppable, Draggable, DragStart } from 'react-beautiful-dnd';

// using some little inline style helpers to make the app look okay
const grid = 16;

import theme from 'modules/theme';

const getItemStyle = (draggableStyle: any, isDragging: any) => ({
	// some basic styles to make the items look a bit nicer
	userSelect: 'none',

	// padding: grid * 2,
	margin: `0 0 ${grid}px 0`,

	// change background colour if dragging
	background: isDragging ? 'lightgreen' : '#fff',

	borderRadius: '10px',

	// styles we need to apply on draggables
	...draggableStyle,
});



const getListStyle = (isDraggingOver: any) => ({
	// background: isDraggingOver ? 'lightblue' : theme.palette.background.contentFrame,
	background: theme.palette.background.contentFrame,
	padding: grid,
});




import AddIcon from 'material-ui-icons/Add';
/**
 * Layer コンポーネント
 */
class LayerList extends React.Component<any> {

	constructor(props: any, context: any) {
		super(props, context);


		this.onDragEnd = this.onDragEnd.bind(this);
	}

	onDragStart = (drag: DragStart) => {

		this.props.actions.selectLayer({
			layerIndex: drag.source.index
		});

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



				<DragDropContext onDragStart={this.onDragStart} onDragEnd={this.onDragEnd}>
					<Droppable droppableId="droppable">
						{(provided, snapshot) => (
							<div
								ref={provided.innerRef}
								style={getListStyle(snapshot.isDraggingOver)}
							>



								{(this.props.layers as any[]).map((layer: ILayer, index) => (

									<Draggable key={index} draggableId={layer.name + index}>

										{(provided, snapshot) => (



											<div id={'layer-' + index} >


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



const styles = (theme: Theme) => ({
	button: {
		margin: theme.spacing.unit,
	}
});


import connect from 'utils/connect';
import { Theme } from 'material-ui/styles/createMuiTheme';

export default connect(LayerList, (state: IState) => ({
	layers: state.layers,
	currentLayerIndex: state.currentLayerIndex
}), styles);