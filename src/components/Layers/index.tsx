import * as React from 'react';
import * as ReactDOM from 'react-dom';

import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';

import Divider from 'material-ui/Divider';

import Button from 'material-ui/Button';
import AddIcon from 'material-ui-icons/Add';
import RemoveIcon from 'material-ui-icons/Remove';


import VisibilityIcon from 'material-ui-icons/Visibility';
import VisibilityOffIcon from 'material-ui-icons/VisibilityOff';


export interface Props {
}

import { ILayer } from 'types/state';
import Layer from 'components/Layer';


import ExpandMoreIcon from 'material-ui-icons/ExpandMore';

/**
 * Layer コンポーネント
 */
const Layers: React.SFC<any> = (props) => {


	return (
		<div>
			<div style={{ maxHeight: '60vh', overflow: 'auto' }}>


				{/*

				<ExpansionPanel expanded={true}>
					<ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
						<Typography >Disabled Expansion Panel</Typography>
					</ExpansionPanelSummary>
				</ExpansionPanel>

				*/}

				<Paper elevation={4} style={{ margin: '1rem .2rem' }}>

					{props.layers.map((layer: ILayer, index: number) => (

						<Layer key={index} name={layer.name} visibility={layer.visibility} layer={layer} />

					))}

				</Paper>


			</div>

			<Button color="accent" onClick={props.actions.addLayer}>
				<AddIcon />
			</Button>

			<Button color="primary" onClick={props.actions.removeLayer}>
				<RemoveIcon />
			</Button>

		</div>
	);
};



import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as TodoActions from 'actions/actionCreators';
import { ExpansionPanel, Typography, ExpansionPanelSummary, Paper } from 'material-ui';


export default connect((state) => ({
	layers: state.layers,
	currentLayer: state.currentLayer,
}), (dispatch) => ({
	actions: bindActionCreators(TodoActions, dispatch)
}))(Layers);