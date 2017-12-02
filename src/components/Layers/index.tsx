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


/**
 * Layer コンポーネント
 */
const Layers: React.SFC<any> = (props) => {


	return (
		<div>
			<div style={{ maxHeight: '60vh', overflow: 'auto' }}>

				<List> {props.children} </List>

			</div>



			<Button  color="primary" onClick={props.actions.addLayer}>
				<AddIcon />
			</Button>

			<Button  color="accent" onClick={props.actions.removeLayer}>
				<RemoveIcon />
			</Button>


		</div>
	);
};



import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as TodoActions from 'actions/actionCreators';

export default connect((state) => ({
	layers: state.layers
}), (dispatch) => ({
	actions: bindActionCreators(TodoActions, dispatch)
}))(Layers);