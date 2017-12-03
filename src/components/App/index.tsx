import * as React from 'react'

import Button from 'material-ui/Button';
import Grid from 'material-ui/Grid';

import Paper from 'material-ui/Paper';

const styles = require('./styles.css')

//import { DragSource } from 'react-dnd';

import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import Divider from 'material-ui/Divider';

import Card from 'material-ui/Card';

import Layers from 'components/Layers';
import Layer from 'components/Layer';

import Tabs, { Tab } from 'material-ui/Tabs';


import Canvas from 'components/Canvas';


import Input, { InputLabel, InputAdornment } from 'material-ui/Input';

import { FormControl, FormHelperText } from 'material-ui/Form';

import Icon from 'material-ui/Icon';
import IconButton from 'material-ui/IconButton';

import AddShoppingCartIcon from 'material-ui-icons/AddShoppingCart';
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
    width: 120,
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


  const { actions } = props;

  return (
    <div>

      <Grid container spacing={0}>

        <Grid item xs={3} alignItems="stretch">


          <Paper elevation={4} style={{ margin: '1rem .2rem' }}>

            <TextField className={props.classes.textField}
              label="Grid Width"
              value={12}
              onChange={() => { }}
              type="number"
              InputLabelProps={{
                shrink: true,
              }}
              margin="normal"
            />

            <TextField className={props.classes.textField}
              label="Grid Height"
              value={12}
              onChange={() => { }}
              type="number"
              InputLabelProps={{
                shrink: true,
              }}
              margin="normal"
            />

          </Paper>


          <Layers />

          <Card>
            <Button raised dense className={props.classes.button} onClick={props.actions.saveJSON}>SAVE JSON</Button>
            <Button raised dense className={props.classes.button} onClick={props.actions.loadProject}>LOAD PROJECT</Button>
          </Card>


        </Grid>



        <Grid item xs={9}>

          <div style={styles.root as any}>

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
                  className={props.classes.textField}
                  onChange={function (e) {

                    e.preventDefault();

                    actions.editorScaleChange(Math.max(parseInt(e.target.value, 10) || 0, 1));

                  }}
                  value={props.editor.scale}
                  endAdornment={<InputAdornment position="end">%</InputAdornment>}
                />
              </FormControl>

              <IconButton color="accent" onClick={() => actions.moveTile({ x: 0, y: -1 })}><ExpandLessIcon /></IconButton>
              <IconButton color="accent" onClick={() => actions.moveTile({ x: 0, y: 1 })} > <ExpandMoreIcon /></IconButton>
              <IconButton color="accent" onClick={() => actions.moveTile({ x: -1, y: 0 })}><ChevronLeftIcon /></IconButton>
              <IconButton color="accent" onClick={() => actions.moveTile({ x: 1, y: 0 })} > <ChevronRightIcon /></IconButton>

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
import { withStyles } from 'material-ui/styles';
import { TextField } from 'material-ui';


export default connect((state) => ({
  layers: state.layers,

  editor: state.editor,

  canvas: state.canvas as ISize,
}), (dispatch) => ({
  actions: bindActionCreators(actions, dispatch)
}))(withStyles(styles2)(App));