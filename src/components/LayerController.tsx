import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { findDOMNode } from 'react-dom';
import { Button, FormControl, Input, FormHelperText, ListItemSecondaryAction, TextField, Card } from 'material-ui';
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


import AddIcon from 'material-ui-icons/Add';
import RemoveIcon from 'material-ui-icons/Remove';



class LayerController extends React.Component<LayerProps> {

  constructor(props: LayerProps, context: any) {
    super(props, context);


  }


  refs: {

  }

  componentWillMount() {

  }

  render() {

    return (
      <div style={{ height: '100px' }}>


        {(this.props as any).currentLayerIndex}










        <div style={{ background: '#fff', display: 'flex' }}>

          <Button style={{ flex: 1 }} color="accent" onClick={this.props.actions.addLayer}>
            <AddIcon />
          </Button>

          <Button style={{ flex: 1 }} color="primary" onClick={this.props.actions.removeLayer}>
            <RemoveIcon />
          </Button>

        </div>

      </div>
    );
  }

}


import { InputAdornment } from 'material-ui/Input';

import connect from 'utils/connect';

export default connect(LayerController, (state: IState) => ({
  layers: state.layers,
  grid: state.grid,

  currentLayerIndex: state.currentLayerIndex

}), {});
