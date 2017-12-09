import * as React from 'react';
import * as ReactDOM from 'react-dom';

import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';

import Grid from 'material-ui/Grid';

import IconButton from 'material-ui/Button';
import VisibilityIcon from 'material-ui-icons/Visibility';
import VisibilityOffIcon from 'material-ui-icons/VisibilityOff';

import LensIcon from 'material-ui-icons/Lens';


import { SketchPicker, RGBColor, ChromePicker } from 'react-color';

const ToggleIcon: any = require('material-ui-toggle-icon').default;


import Popover from 'material-ui/Popover';
import { findDOMNode } from 'react-dom';
import { Button, FormControl, Input, FormHelperText, ListItemSecondaryAction, Card, CardHeader, Avatar, CardMedia, CardContent, Typography, CardActions, Collapse, TextField } from 'material-ui';
import { ILayer, IState } from 'types/state';

import * as actions from 'actions/actionCreators';

export interface LayerProps {
	name?: string;
	visibility?: boolean;
	layer?: ILayer;

	selected?: boolean;

	actions?: any;
}

interface LayerState {
	openColor: boolean;
	anchorEl?: Element;

	open: boolean
}

const classnames = require('classnames');

import ExpandMoreIcon from 'material-ui-icons/ExpandMore';


class Layer extends React.Component<LayerProps> {


	constructor(props: LayerProps, context: any) {
		super(props, context);

		this.handleRequestClose = this.handleRequestClose.bind(this);
		this.handleOpenPallet = this.handleOpenPallet.bind(this);
		this.handleExpandClick = this.handleExpandClick.bind(this);
	}

	anchorEl?: Element;

	refs: {

	}

	state: LayerState = {

		openColor: false,

		open: false,

	}

	handleExpandClick() {
		this.setState({ open: !this.state.open });
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

		const { classes, actions } = this.props as any;


		return (
			<div>

				<Card style={{ padding: '1rem', background: (this.props.selected ? '#9f9' : 'fff') }}>


					<div>{this.props.selected}</div>


					<TextField
						label="Layer Name"
						margin="normal"

						value={this.props.name}

						style={{ width: '100%' }}

						onChange={({ target }) => {
							this.props.actions.changeLayerName({
								layerIndex: (this.props as any).layers.findIndex((l: any) => l === this.props.layer),
								name: target.value
							});
						}}

					/>




					{/* 表示非表示ボタン */}
					<IconButton style={{ margin: 12 }} onClick={(e) => {



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
						<ChromePicker disableAlpha color={this.props.layer.color} onChange={(value) => {

							this.props.actions.setLayerColor({
								layerIndex: (this.props as any).layers.findIndex((l: any) => l === this.props.layer),
								color: value.hex
							});

						}} />
					</Popover>





					<IconButton

						className={classnames(classes.expand, {
							[classes.expandOpen]: this.state.open,
						})}
						onClick={this.handleExpandClick}
						aria-expanded={this.state.open}
						aria-label="Show more"
					>
						<ExpandMoreIcon />
					</IconButton>

					<Collapse in={this.state.open} timeout="auto" unmountOnExit>


						<div style={{}}>

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


							{

								Array.from({ length: 8 }).map(() => (

									<FormControl style={{ margin: '0' }}>
										<FormHelperText>Height</FormHelperText>
										<Input
											value={this.props.layer.height}
											onChange={() => { }}
											endAdornment={<InputAdornment position="end">M</InputAdornment>}
											style={{ width: '80px' }}
										/>
									</FormControl>

								))
							}






						</div>

					</Collapse>

				</Card>
			</div>

		);
	}

}



import { InputAdornment } from 'material-ui/Input';

const styles = (theme: any) => ({
	expand: {
		transform: 'rotate(0deg)',
		transition: theme.transitions.create('transform', {
			duration: theme.transitions.duration.shortest,
		}),
	},
	expandOpen: {
		transform: 'rotate(180deg)',
	},
});

import connect from 'utils/connect';

export default connect(Layer, (state: IState) => ({
	layers: state.layers,
}), styles) as React.ComponentClass<LayerProps>;
