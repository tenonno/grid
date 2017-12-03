import * as React from 'react';
import * as ReactDOM from 'react-dom';

import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';

import Grid from 'material-ui/Grid';

import IconButton from 'material-ui/Button';
import VisibilityIcon from 'material-ui-icons/Visibility';
import VisibilityOffIcon from 'material-ui-icons/VisibilityOff';

import LensIcon from 'material-ui-icons/Lens';


import { SketchPicker, RGBColor } from 'react-color';

const ToggleIcon: any = require('material-ui-toggle-icon').default;

const styles = require('./styles.css')

import Popover from 'material-ui/Popover';
import { findDOMNode } from 'react-dom';
import { Button, FormControl, Input, FormHelperText, ListItemSecondaryAction } from 'material-ui';
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
	 	}: any = {
				anchorOriginVertical: 'bottom',
				anchorOriginHorizontal: 'center',
				transformOriginVertical: 'top',
				transformOriginHorizontal: 'center',
			};


		return (
			<div>


				<Grid container>
					<Grid item xs={5}>
						<ListItemText primary={this.props.name} />
					</Grid>
					<Grid item xs={7}>

						{/* 表示非表示ボタン */}
						<IconButton onClick={(e) => {

							this.props.actions.setLayerVisibility({
								layerIndex: (this.props as any).layers.findIndex((l: any) => l === this.props.layer),
								visibility: !this.props.layer.visibility
							});

						}} >
							<ToggleIcon
								on={this.props.visibility}
								onIcon={<VisibilityIcon />}
								offIcon={<VisibilityOffIcon />}
							/>
						</IconButton>


						<span
							ref={(el) => this.anchorEl = el}
							onClick={this.handleOpenPallet}

							style={{
								button: {
								},
								input: {
									display: 'none',
								}
							}}
						>
							<IconButton><LensIcon color={this.props.layer.color} /></IconButton>
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

								this.props.actions.setLayerColor({
									layerIndex: (this.props as any).layers.findIndex((l: any) => l === this.props.layer),
									color: value.hex
								});

							}} />
						</Popover>


					</Grid>

					<Grid item xs={12}>
						<FormControl style={{ margin: '0 1rem' }}>
							<FormHelperText>Floor</FormHelperText>
							<Input
								value={this.props.layer.floor}
								onChange={() => { }}
								endAdornment={<InputAdornment position="end"></InputAdornment>}
								style={{ width: '100px' }}
							/>
						</FormControl>

						<FormControl style={{ margin: '0 1rem' }}>
							<FormHelperText>Height</FormHelperText>
							<Input
								value={this.props.layer.height}
								onChange={() => { }}
								endAdornment={<InputAdornment position="end">M</InputAdornment>}
								style={{ width: '100px' }}
							/>
						</FormControl>


					</Grid>

				</Grid>
			</div>

		);
	}

}



import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Dispatch } from 'redux';
import { InputAdornment } from 'material-ui/Input';




export default connect<{}, {}, any>((state: IState) => ({
	layers: state.layers,
}), (dispatch: Dispatch<typeof actions>) => ({
	actions: bindActionCreators(actions, dispatch)
}))(Layer);

// export default Layer;//

