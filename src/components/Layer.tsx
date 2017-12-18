import * as React from 'react';
import * as ReactDOM from 'react-dom';

import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';

import Grid from 'material-ui/Grid';

import { IconButton } from 'material-ui';
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

import theme from 'modules/theme';

export interface LayerProps {
	name?: string;
	visibility?: boolean;
	layer?: ILayer;

	layers?: ILayer[];

	selected?: boolean;

}

interface LayerState {
	openColor: boolean;
	anchorEl?: Element;

	open: boolean
}



const classnames = require('classnames');

import ExpandMoreIcon from 'material-ui-icons/ExpandMore';


import AddIcon from 'material-ui-icons/Add';

type LayerProps2 = LayerProps & { actions: typeof actions, classes: any };

class Layer extends React.Component<LayerProps2> {


	constructor(props: LayerProps2, context: any) {
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

	handleUploadBackground = () => {

		const layerIndex = this.props.layers.indexOf(this.props.layer);

		this.props.actions.uploadBackground({ layerIndex });
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

		const { actions, classes } = this.props;

		return (

			<div onClick={(el) => {

				this.props.actions.selectLayer({
					layerIndex: (this.props as any).layers.findIndex((l: any) => l === this.props.layer),
				});

				//	console.warn(this.props.selected);

			}}>


				<Card style={{ transition: 'border .5s', boxSizing: 'border-box', textAlign: 'center', padding: '0 1rem', border: (this.props.selected ? `solid 2px ${theme.palette.primary.A400}` : '') }}>




					<TextField
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


					<div style={{
						display: 'flex',
						justifyContent: 'center',
						alignItems: 'center',
						flexWrap: 'wrap'
					}}>



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


						{/* 表示非表示ボタン */}
						<IconButton onClick={(e) => {
							this.props.actions.setLayerVisibility({
								layerIndex: (this.props as any).layers.findIndex((l: any) => l === this.props.layer),
								visibility: !this.props.layer.visibility
							});
						}}>
							<ToggleIcon on={this.props.visibility} onIcon={<VisibilityIcon />} offIcon={<VisibilityOffIcon />}
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


						<img
							className={this.state.open ? classes.expandI : classes.expandOpenI}
							style={{
								transition: 'all 300ms 0s ease'
							}}
							src={this.props.layer.background}
						/>

					</div>


					<Collapse in={this.state.open} timeout="auto" unmountOnExit>

						<Button onClick={this.handleUploadBackground} style={{ width: '100%', height: '20px' }} className={classes.button} raised color="default">
							Upload
						</Button>

						<div>

							<FormControl className={this.props.classes.textField}>
								<FormHelperText>Floor</FormHelperText>
								<Input
									value={this.props.layer.floor}
									onChange={() => { }}
									endAdornment={<InputAdornment position="end"></InputAdornment>}
									style={{ width: '100px' }}
								/>
							</FormControl>

							<FormControl className={this.props.classes.textField}>
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

									<FormControl className={(this.props as any).classes.textField}>
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

const styles = (theme: Theme) => ({
	expand: {
		transform: 'rotate(0deg)',
		transition: theme.transitions.create('transform', {
			duration: theme.transitions.duration.shortest,
		}),
	},
	expandOpen: {
		transform: 'rotate(180deg)',
	},

	expandI: {
		width: '100%'


	},
	expandOpenI: {
		width: '40px', height: '40px',
	},


	textField: {
		margin: theme.spacing.unit
	}







});

import connect from 'utils/connect';
import { Theme } from 'material-ui/styles/createMuiTheme';

export default connect(Layer, (state: IState) => ({
	layers: state.layers,
}), styles) as React.ComponentClass<LayerProps>;