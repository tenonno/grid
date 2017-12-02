import * as React from 'react' // tslint:disable-line:no-unused-variable
//import VisibleTodoList from 'containers/VisibleTodoList'

import Button from 'material-ui/Button';
import Grid from 'material-ui/Grid';

import Paper from 'material-ui/Paper';

const styles = require('./styles.css')

// const w = require('components/App2');

//import { DragSource } from 'react-dnd';

import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import Divider from 'material-ui/Divider';

import Card from 'material-ui/Card';

import Layers from 'components/Layers';
import Layer from 'components/Layer';

import Tabs, { Tab } from 'material-ui/Tabs';


import Canvas from 'components/Canvas';


let rect: ISize = { x: 0, y: 0, width: 0, height: 0 };

let $props: any = null;

window.setInterval(() => {
  if (true == true) return;
  if (!$props) return;

  $props.actions.resizeCanvas(rect);

}, 1000);
import Input, { InputLabel, InputAdornment } from 'material-ui/Input';

import { FormControl, FormHelperText } from 'material-ui/Form';

import Icon from 'material-ui/Icon';
import IconButton from 'material-ui/IconButton';
import DeleteIcon from 'material-ui-icons/Delete';
import AddShoppingCartIcon from 'material-ui-icons/AddShoppingCart';
import PhotoCamera from 'material-ui-icons/PhotoCamera';

/**
 * App コンポーネント
 * @param props 
 */
const App: React.SFC<any> = (props: any) => {

  var styles = {
    root: {
      height: '100vh',
      display: 'flex',
      flexDirection: 'column'
    }
  };


  const EventListener = require('react-event-listener').default;


  function onResize() {

    if (true == true) return;

    if (!document) return;

    const d = document.getElementById('stage');

    if (!d) return;

    console.log('resize', d.clientWidth, d.clientHeight);

    const clientRect = d.getBoundingClientRect();

    $props = props;

    rect.x = clientRect.left;
    rect.y = clientRect.top;
    rect.width = clientRect.width;
    rect.height = clientRect.height;
  }


  const { actions } = props;

  return (
    <div>

      <EventListener target={window} onResize={onResize} />

      <Grid container spacing={0}>

        <Grid item xs={3} alignItems="stretch">
          <Paper >


            <Layers>


              {props.layers.map((layer: ILayer, index: number) => (

                <Layer key={index} name={layer.name} visibility={layer.visibility} />

              ))}

            </Layers>


          </Paper>



        </Grid>



        <Grid item xs={9}>

          <div style={styles.root as any}>

            <Tabs value={false} centered onChange={() => { }} indicatorColor="primary">
              <Tab label="2D" />
              <Tab label="3D" />
            </Tabs>

            <div id="stage" style={{ height: '100%', background: 'red' }}>

              <Canvas></Canvas>

            </div>


            <div style={{ padding: '.5rem' }}>

              <FormControl >




                <Input
                  id="weight"

                  type="number"

                  onChange={({ target }) => actions.editorScaleChange(Math.max(parseInt(target.value, 10) || 0, 1))}

                  value={props.editor.scale}

                  endAdornment={<InputAdornment position="end">%</InputAdornment>}
                />
              </FormControl>

              <IconButton color="accent" aria-label="Add an alarm">
                <AddShoppingCartIcon />
              </IconButton>

              <IconButton color="accent" aria-label="Add an alarm">
                <AddShoppingCartIcon />
              </IconButton>

            </div>

          </div>


        </Grid>

      </Grid>
    </div>
  );
};

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as actions from 'actions/actionCreators';
import { ILayer, ISize } from 'types/state';

export default connect((state) => ({
  layers: state.layers,

  editor: state.editor,

  canvas: state.canvas as ISize,
}), (dispatch) => ({
  actions: bindActionCreators(actions, dispatch)
}))(App);