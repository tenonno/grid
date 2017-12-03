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



/**
 * Layer コンポーネント
 */
const Layers: React.SFC<any> = (props) => {


	return (
		<div>
			<div style={{ maxHeight: '60vh', overflow: 'auto' }}>


				<List>

					{props.layers.map((layer: ILayer, index: number) => (

						<Layer key={index} name={layer.name} visibility={layer.visibility} layer={layer}/>

					))}
				</List>

			</div>



			<Button color="primary" onClick={props.actions.addLayer}>
				<AddIcon />
			</Button>

			<Button color="accent" onClick={props.actions.removeLayer}>
				<RemoveIcon />
			</Button>


		</div>
	);
};



import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as TodoActions from 'actions/actionCreators';


export default connect((state) => ({
	layers: state.layers,
	currentLayer: state.currentLayer,
}), (dispatch) => ({
	actions: bindActionCreators(TodoActions, dispatch)
}))(Layers);