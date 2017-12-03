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




import { remote } from 'electron';
const Dialog = remote.dialog;

/*
console.log(remote);
Dialog.showOpenDialog(null, {
  properties: ['openFile'],
  title: 'ファイル(単独選択)',
  defaultPath: '.',
  filters: [
      {name: 'テキストファイル', extensions: ['txt']},
      {name: 'JSONファイル', extensions: ['json']}
  ]
}, (fileNames: string) => {
  console.log(fileNames);
});

*/

import { IState } from 'types/state';

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


  }

  const { actions } = props;

  return (
    <div>

      <EventListener target={window} onResize={onResize} />

      <Grid container spacing={0}>

        <Grid item xs={3} alignItems="stretch">

          <IconButton color="accent" onClick={() => {


            Dialog.showSaveDialog(null, {
              title: '保存',
              defaultPath: '.',
              filters: [
                { name: 'テキストファイル', extensions: ['txt'] },
                { name: 'JSONファイル', extensions: ['json'] }
              ]
            }, (savedFiles: any) => {
              console.log(savedFiles);
            });


          }}><ChevronRightIcon /></IconButton>


          <Layers />



        </Grid>



        <Grid item xs={9}>

          <div style={styles.root as any}>

            <Tabs value={false} centered onChange={() => { }} indicatorColor="primary">
              <Tab label="2D" />
              <Tab label="3D" />
            </Tabs>

            <div style={{ display: 'flex', height: '100%', background: 'red' }}>

              <Canvas></Canvas>

            </div>


            <div style={{ padding: '.5rem' }}>

              <FormControl >




                <Input
                  id="weight"

                  type="number"

                  //onChange={({ target }) => actions.editorScaleChange(Math.max(parseInt(target.value, 10) || 0, 1))}

                  onChange={function (e) {

                    e.preventDefault();

                    actions.editorScaleChange(Math.max(parseInt(e.target.value, 10) || 0, 1));

                  }}




                  value={props.editor.scale}

                  endAdornment={<InputAdornment position="end">%</InputAdornment>}
                />
              </FormControl>

              <IconButton color="accent"><AddShoppingCartIcon /></IconButton>
              <IconButton color="accent"><AddShoppingCartIcon /></IconButton>
              <IconButton color="accent"><AddShoppingCartIcon /></IconButton>
              <IconButton color="accent"><AddShoppingCartIcon /></IconButton>

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

export default connect((state) => ({
  layers: state.layers,

  editor: state.editor,

  canvas: state.canvas as ISize,
}), (dispatch) => ({
  actions: bindActionCreators(actions, dispatch)
}))(App);