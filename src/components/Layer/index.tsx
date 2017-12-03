import * as React from 'react';
import * as ReactDOM from 'react-dom';

import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';

import Grid from 'material-ui/Grid';

import IconButton from 'material-ui/Button';
import VisibilityIcon from 'material-ui-icons/Visibility';
import VisibilityOffIcon from 'material-ui-icons/VisibilityOff';


import { SketchPicker, RGBColor } from 'react-color';

const ToggleIcon: any = require('material-ui-toggle-icon').default;

const styles = require('./styles.css')

import Popover from 'material-ui/Popover';
import { findDOMNode } from 'react-dom';
import { Button } from 'material-ui';
import { ILayer, IState } from 'types/state';


import * as actions from 'actions/actionCreators';

export interface LayerProps {
	name?: string;
	visibility?: boolean;
	layer?: ILayer;

	actions?: any;
}

interface State {
	openColor: boolean;
	anchorEl?: Element;
}


class Layer extends React.Component<LayerProps> {


	constructor(props: LayerProps, context: any) {
		super(props, context);

		this.handleRequestClose = this.handleRequestClose.bind(this);
		this.handleOpenPallet = this.handleOpenPallet.bind(this);

	}

	anchorEl?: Element;


	refs: {

	}

	state: State = {

		openColor: false,

	}

	handleRequestClose() {
		this.setState({
			openColor: false
		})
	}

	handleOpenPallet() {
		this.setState({
			openColor: true
		})
	}

	render() {

		let {
			anchorOriginVertical,
			anchorOriginHorizontal,
			transformOriginVertical,
			transformOriginHorizontal,
			positionTop,
			positionLeft,
	 	}: any = {
				open: false,
				anchorEl: null,
				anchorOriginVertical: 'bottom',
				anchorOriginHorizontal: 'center',
				transformOriginVertical: 'top',
				transformOriginHorizontal: 'center',
				positionTop: 200, // Just so the popover can be spotted more easily
				positionLeft: 400, // Same as above
				anchorReference: 'anchorEl',
			};


		return (
			<div>

				<ListItem button style={{ backgroud: "red" }}>


					<Grid container>
						<Grid item xs={5}>
							<ListItemText primary={this.props.name} />
						</Grid>
						<Grid item xs={7}>


							<IconButton onClick={() => { }} >
								<ToggleIcon
									on={this.props.visibility}
									onIcon={<VisibilityIcon />}
									offIcon={<VisibilityOffIcon />}
								/>
							</IconButton>


							<span
								ref={(el) => this.anchorEl = el}
								onClick={this.handleOpenPallet}

								style={{ background: this.props.layer.color }}

							>
								<IconButton><VisibilityIcon /></IconButton>
							</span>


							<Popover
								open={this.state.openColor}
								anchorEl={this.anchorEl}
								//anchorReference={anchorReference}
								//anchorPosition={{ top: positionTop, left: positionLeft }}
								onRequestClose={this.handleRequestClose}
								anchorOrigin={{
									vertical: anchorOriginVertical,
									horizontal: anchorOriginHorizontal,
								}}
								transformOrigin={{
									vertical: transformOriginVertical,
									horizontal: transformOriginHorizontal,
								}}
							>
								<SketchPicker disableAlpha color={this.props.layer.color} onChange={(value) => {

									this.props.actions.setLayerColor({ color: value.hex });

								}} />
							</Popover>


						</Grid>
					</Grid>
				</ListItem>
			</div>

		);
	}

}



import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Dispatch } from 'redux';




export default connect<{}, {}, any>((state: IState) => ({
	layers: state.layers,
}), (dispatch: Dispatch<typeof actions>) => ({
	actions: bindActionCreators(actions, dispatch)
}))(Layer);

// export default Layer;//

