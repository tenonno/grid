import * as React from 'react'

import Button from 'material-ui/Button';
import Grid from 'material-ui/Grid';

import Paper from 'material-ui/Paper';

const styles = require('./styles.css')

//import { DragSource } from 'react-dnd';


import Canvas from 'components/Canvas';
import Layers from 'components/Layers';
import Layer from 'components/Layer';

import Tabs, { Tab } from 'material-ui/Tabs';
import Card from 'material-ui/Card';
import Divider from 'material-ui/Divider';
import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import Input, { InputLabel, InputAdornment } from 'material-ui/Input';
import { FormControl, FormHelperText } from 'material-ui/Form';

import Icon from 'material-ui/Icon';
import IconButton from 'material-ui/IconButton';

// 上下左右アイコン
import ChevronLeftIcon from 'material-ui-icons/ChevronLeft';
import ChevronRightIcon from 'material-ui-icons/ChevronRight';
import ExpandLessIcon from 'material-ui-icons/ExpandLess';
import ExpandMoreIcon from 'material-ui-icons/ExpandMore';


import { IState } from 'types/state';


const styles2 = (theme: any) => ({
  button: {
    margin: theme.spacing.unit,
  },
  input: {
    display: 'none',
  },

  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 90,
  },

});


import View3D from 'components/View3D';

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


  console.log(props);


  const { actions, classes } = props;


  return (
    <div>


      <Drawer type="persistent" open>

        <div style={{ display: 'flex', flexDirection: 'column', width: '220px', height: '100vh' }}>

          <div>

            <TextField className={classes.textField}
              label="Grid Width"
              value={props.grid.width}
              onChange={(e) => actions.resize({ x: e.target.value, y: props.grid.height })}
              type="number"
              InputLabelProps={{
                shrink: true,
              }}
              margin="normal"
            />
            <TextField className={classes.textField}
              label="Grizd Height"
              value={props.grid.height}
              onChange={(e) => actions.resize({ x: props.grid.width, y: e.target.value })}
              type="number"
              InputLabelProps={{
                shrink: true,
              }}
              margin="normal"
            />

          </div>
          <div style={{ background: 'pink', flex: 1 }}>
          
            <Layers />
          
          </div>
          <div style={{ background: 'yellow' }}>
          

          <Card>
            {/* SAVE PROJECT */}
            <Button raised dense className={classes.button} onClick={actions.saveJSON}>SAVE PROJECT</Button>
            {/* LOAD PROJECT */}
            <Button raised dense className={classes.button} onClick={actions.loadProject}>LOAD PROJECT</Button>
            {/* EXPORT OBJ */}
            <Button raised dense className={classes.button} onClick={actions.exportOBJ}>EXPORT OBJ</Button>
          </Card>
          
          
          </div>

        </div>
      </Drawer>


      <main style={{ marginLeft: '220px', width: 'calc(100% - 220px)' }}>

        <div style={{
          height: '100vh',
          display: 'flex',
          flexDirection: 'column'
        }}>



          <Tabs value={props.editor.tab} centered onChange={(e, value) => actions.changeEditorTab({ value })} indicatorColor="primary">
            <Tab value="2d" label="2D" />
            <Tab value="3d" label="3D" />
          </Tabs>




          <div id="view-container" style={{ display: 'flex', height: '100%', background: 'red' }}>

            {props.editor.tab === '2d' && (
              <Canvas />
            )}

            {props.editor.tab === '3d' && (
              <View3D />
            )}


          </div>


          <div style={{ padding: '.5rem' }}>

            <FormControl>
              <Input
                type="number"
                className={classes.textField}
                onChange={function (e) {
                  actions.editorScaleChange({ scale: e.target.value });
                }}
                value={props.editor.scale}
                endAdornment={<InputAdornment position="end">%</InputAdornment>}
              />
            </FormControl>

            <IconButton color="accent" onClick={() => actions.moveTile({ x: 0, y: -1 })}><ExpandLessIcon /></IconButton>
            <IconButton color="accent" onClick={() => actions.moveTile({ x: 0, y: 1 })} > <ExpandMoreIcon /></IconButton>
            <IconButton color="accent" onClick={() => actions.moveTile({ x: -1, y: 0 })}><ChevronLeftIcon /></IconButton>
            <IconButton color="accent" onClick={() => actions.moveTile({ x: 1, y: 0 })} > <ChevronRightIcon /></IconButton>

            |

              <IconButton color="accent" onClick={() => actions.undo()}><ChevronLeftIcon /></IconButton>
            <IconButton color="accent" onClick={() => actions.redo()}><ChevronRightIcon /></IconButton>

            |


              <IconButton color="accent" disabled={props.$s.past.length > 0} onClick={() => store.dispatch(ActionCreators.undo())}><ChevronLeftIcon /></IconButton>
            <IconButton color="accent" disabled={props.$s.future.length > 0} onClick={() => store.dispatch(ActionCreators.redo())}><ChevronRightIcon /></IconButton>

          </div>
        </div>
      </main>
    </div>
  );
};


import { ILayer, ISize } from 'types/state';

import { TextField, AppBar, Typography, Toolbar, Drawer } from 'material-ui';
import { ActionCreators } from 'redux-undo';
import { store } from 'index';

import connect from 'utils/connect';

export default connect(App, (state: IState, $s: any) => ({
  layers: state.layers,
  editor: state.editor,
  grid: state.grid,
  canvas: state.canvas,

  $s: $s,

}), styles2);
