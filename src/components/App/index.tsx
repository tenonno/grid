import * as React from 'react' // tslint:disable-line:no-unused-variable
import Footer from 'components/Footer'
import AddTodo from 'containers/AddTodo'
import VisibleTodoList from 'containers/VisibleTodoList'

import Button from 'material-ui/Button';
import Grid from 'material-ui/Grid';

import Paper from 'material-ui/Paper';

const styles = require('./styles.css')


import { DragSource } from 'react-dnd';

const App = () => (
  <div>

    <Grid container spacing={0}>
      <Grid item xs={3}>
        <Paper >



          <Button raised color="primary">
            Hello World
    </Button>
        </Paper>
      </Grid>

      <Grid item xs={9}>
        <Paper >xs=12</Paper>
      </Grid>
    </Grid>
  </div>
)

export default App
