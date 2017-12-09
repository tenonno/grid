import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { findDOMNode } from 'react-dom';
import { Button, FormControl, Input, FormHelperText, ListItemSecondaryAction, TextField } from 'material-ui';
import { ILayer, IState } from 'types/state';

import * as actions from 'actions/actionCreators';

export interface LayerProps {

    layers: ILayer[];

    actions?: any;
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
        console.log('更新！')
    }

    render() {
        return (
            <div>

                {/* SAVE PROJECT */}
                <Button raised dense onClick={this.props.actions.saveJSON}>SAVE PROJECT</Button>
                {/* LOAD PROJECT */}
                <Button raised dense onClick={this.props.actions.loadProject}>LOAD PROJECT</Button>
                {/* EXPORT OBJ */}
                <Button raised dense onClick={this.props.actions.exportOBJ}>EXPORT OBJ</Button>

            </div>
        );
    }

}


import connect from 'utils/connect';

export default connect(Project, (state: IState) => ({
    layers: state.layers,
    grid: state.grid,
}), {});
