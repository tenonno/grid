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

import Layers from 'components/Layers';
import Layer from 'components/Layer';

import Tabs, { Tab } from 'material-ui/Tabs';





const handleChange = (event: any, value: any) => {

};

/**
 * App コンポーネント
 * @param props 
 */
const App = (props: any) => (
  <div>


    <Grid container spacing={0}>

      <Grid item xs={3} alignItems="stretch">
        <Paper >

          <Button raised color="primary">
            Hello World2
          </Button>

          <Button raised color="primary">
            Hello World
          </Button>

          <Divider />


          <Layers>


            {props.layers.map((layer: ILayer) => (
            
              <Layer name={layer.name} visibility={layer.visibility} />
              
            ))}

          </Layers>


        </Paper>



      </Grid>





      <Grid item xs={9} >

        <Tabs value={false} centered onChange={handleChange} indicatorColor="primary">
          <Tab label="2D" />
          <Tab label="3D" />
        </Tabs>

        <div style={{ height: '100vh', background: 'red' }}></div>


      </Grid>

    </Grid>
  </div>
)

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as TodoActions from 'actions/actionCreators';
import { ILayer } from 'types/state';

export default connect((state) => ({
  layers: state.layers
}), (dispatch) => ({
  actions: bindActionCreators(TodoActions, dispatch)
}))(App);