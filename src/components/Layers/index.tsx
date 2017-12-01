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

export default class Layers extends React.Component<Props, any> {
	constructor(props: Props) {
		super(props);
		this.state = {
			inputValue: '',
			outputValue: '',
		}
		this.handleChange = this.handleChange.bind(this);
		this.handleClick = this.handleClick.bind(this);
	}
	handleChange(e: any): void {
		this.setState({
			inputValue: e.target.value,
		});
	}
	handleClick(): void {
		this.setState({
			inputValue: '',
			outputValue: this.state.inputValue,
		});
	}
	render() {
		return (
			<div>
				<div style={{ maxHeight: '60vh', overflow: 'auto' }}>
					<List> {this.props.children} </List>


				</div>
				<Divider />


				<Button fab color="primary" aria-label="add" >
					<AddIcon />
				</Button>
				<Button fab color="accent" aria-label="edit">
					<RemoveIcon />
				</Button>

				<Button fab color="primary" aria-label="add" ><VisibilityIcon /></Button>
				<Button fab color="accent" aria-label="edit"><VisibilityOffIcon />	</Button>


			</div>
		);
	}
}