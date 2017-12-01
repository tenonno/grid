import * as React from 'react';
import * as ReactDOM from 'react-dom';

import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';

export interface Props {
	name: string;
	enthusiasmLevel?: number;
}
const styles = require('./styles.css')


export default class Layer extends React.Component<any, any> {
	constructor(props: any) {
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
			<div >
				<ListItem button style={{backgroud:"red"}}>
					<ListItemText primary="Trash" />
				</ListItem>
			</div>
		);
	}
}