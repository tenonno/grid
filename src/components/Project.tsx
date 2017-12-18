import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { findDOMNode } from 'react-dom';
import { Button, FormControl, Input, FormHelperText, ListItemSecondaryAction, TextField } from 'material-ui';
import { ILayer, IState } from 'types/state';

import * as actions from 'actions/actionCreators';


const styles = (theme: Theme) => ({
    button: {
        margin: theme.spacing.unit,
        width: '100px'
    }
});


export interface LayerProps {

    layers: ILayer[];

    actions?: any;

    classes: any;

}

interface State {
    openColor: boolean;
    anchorEl?: Element;
}


class Project extends React.Component<LayerProps> {


    constructor(props: LayerProps, context: any) {
        super(props, context);

        this.handleMount = this.handleMount.bind(this);
    }


    refs: {

    }

    componentWillMount() {

    }

    handleMount() {
        console.log('更新！');

    }

    render() {
        return (
            <div style={{ textAlign: 'center' }}>

                {/* SAVE PROJECT */}
                <Button raised dense className={this.props.classes.button} onClick={this.props.actions.saveJSON}>SAVE PROJECT</Button>
                {/* LOAD PROJECT */}
                <Button raised dense className={this.props.classes.button} onClick={this.props.actions.loadProject}>LOAD PROJECT</Button>
                
                {/* EXPORT JSON */}
                <Button raised dense className={this.props.classes.button} onClick={this.props.actions.exportJSON}>EXPORT JSON</Button>
                {/* IMPORT JSON */}
                <Button raised dense className={this.props.classes.button} onClick={this.props.actions.importJSON}>IMPORT JSON</Button>
                
                {/* EXPORT OBJ */}
                <Button raised dense className={this.props.classes.button} onClick={this.props.actions.exportOBJ}>EXPORT OBJ</Button>

            </div>
        );
    }

}


import { Theme } from 'material-ui/styles/createMuiTheme';



import connect from 'utils/connect';

export default connect(Project, (state: IState) => ({
    layers: state.layers,
    grid: state.grid,
}), styles);
