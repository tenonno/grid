import * as React from 'react';
import * as ReactDOM from 'react-dom';

import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';

import Grid from 'material-ui/Grid';

import IconButton from 'material-ui/Button';
import VisibilityIcon from 'material-ui-icons/Visibility';
import VisibilityOffIcon from 'material-ui-icons/VisibilityOff';

export interface Props {
	name: string;
}

const ToggleIcon: any = require('material-ui-toggle-icon').default;

const styles = require('./styles.css')


const Layer: React.SFC<any> = (props: any) => {
	return (
		<div >

			<ListItem button style={{ backgroud: "red" }}>


				<Grid container>
					<Grid item xs={5}>
						<ListItemText primary={props.name} />
					</Grid>
					<Grid item xs={7}>


						<IconButton onClick={() => {}} >
							<ToggleIcon
								on={props.visibility}
								onIcon={<VisibilityIcon />}
								offIcon={<VisibilityOffIcon />}
							/>
						</IconButton>




					</Grid>
				</Grid>
			</ListItem>
		</div>

	);
};



export default Layer;//
