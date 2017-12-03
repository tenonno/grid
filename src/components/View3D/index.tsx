import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { findDOMNode } from 'react-dom';
import { Button, FormControl, Input, FormHelperText, ListItemSecondaryAction } from 'material-ui';
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


import { mount3D, update3D} from 'modules/3d';

class View3D extends React.Component<LayerProps> {


    constructor(props: LayerProps, context: any) {
        super(props, context);

        this.handleMount = this.handleMount.bind(this);
    }


    refs: {

    }

    componentWillMount() {

        mount3D();

    }

    handleMount() {

        console.log('更新！')
        update3D(this.props.layers, (this.props as any).grid.width, (this.props as any).grid.height);
    }

    render() {

        console.warn('Render: View3D');

        return (
            <div>

                <div style={{}}>

                    <div id="ww" ref={() => this.handleMount()} style={{ background: '#f0f', width: '500px', height: '500px' }}></div>

                </div>

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
    grid: state.grid,
}), (dispatch: Dispatch<typeof actions>) => ({
    actions: bindActionCreators(actions, dispatch)
}))(View3D);
