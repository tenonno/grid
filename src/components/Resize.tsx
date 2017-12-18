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

import { Theme } from 'material-ui/styles';

import { mount3D, update3D } from 'modules/3d';

const styles = (theme: Theme) => ({
    textField: {
        margin: theme.spacing.unit,
        width: '90px'
    },
    button: {
        margin: theme.spacing.unit,
    }
});

class Resize extends React.Component<LayerProps> {


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


        console.log((this.props as any).classes);


        return (
            <div>
                <TextField
                    label="Grid Width"
                    type="number"


                    className={(this.props as any).classes.textField}


                    InputLabelProps={{
                        shrink: true,
                    }}
                    margin="normal"
                />
                <TextField
                    label="Grid Height"
                    type="number"

                    className={(this.props as any).classes.textField}

                    InputLabelProps={{
                        shrink: true,
                    }}
                    margin="normal"
                />

                <Button className={(this.props as any).classes.button} raised color="primary">
                    
                </Button>

            </div>

        );
    }

}


import { InputAdornment } from 'material-ui/Input';

import connect from 'utils/connect';

export default connect(Resize, (state: IState) => ({
    layers: state.layers,
    grid: state.grid,
}), styles);
