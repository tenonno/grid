import { Store } from 'redux'
import * as React from 'react' // tslint:disable-line:no-unused-variable
import { render } from 'react-dom'
import { Provider, connect } from 'react-redux'

import App from 'components/App';

declare var module: { hot: any }
declare var window: { devToolsExtension: any }

// ルート要素
const rootEl = document.getElementById('root');

import { createStore, compose, applyMiddleware } from 'redux';
import * as rrr from 'redux'

console.log(rrr)

// import thunk from 'redux-thunk';

// Redux Saga
import createSagaMiddleware from 'redux-saga';


import rootSaga from 'sagas/root';


const sagaMiddleware = createSagaMiddleware()

/**
 * ブラウザの Redux 拡張機能を開く
 */
function devToolsExtension() {
  if (window.devToolsExtension) return window.devToolsExtension();
  return () => { };
}

// Reducer
import reducer from 'reducers/index';
import { IState } from 'types/state';
console.log(createStore);
// ストア
/*
const store = createStore(
  reducer,
  compose(
    //    applyMiddleware(thunk),
    //  applyMiddleware(sagaMiddleware)
    devToolsExtension()
  )
);
*/


import undoable from 'redux-undo';

let store: any;//Store<IState>;

if (!__DEV__) {

  const undoableReducer = undoable(reducer);

  store = createStore(
    undoableReducer,
    applyMiddleware(sagaMiddleware)
  );
} else {

  const undoableReducer = undoable(reducer);

  store = createStore(
    undoableReducer,
    compose(
      applyMiddleware(sagaMiddleware),
      devToolsExtension())
  ) as Store<IState>;
}

export { store };

import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';

sagaMiddleware.run(rootSaga);

import theme from 'modules/theme';

render(
  <MuiThemeProvider theme={theme}>
    <Provider store={store}>
      <App />
    </Provider>
  </MuiThemeProvider>
  , rootEl
)

// HMR

if (module.hot) {
  module.hot.accept('./components/App.tsx', function () {
    let NextApp = require('./components/App.tsx').default
    render(
      <MuiThemeProvider theme={theme}>
        <Provider store={store}>
          <NextApp />
        </Provider>
      </MuiThemeProvider>,
      rootEl
    )
  })
}
