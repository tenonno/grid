import { Store } from 'redux'
import * as React from 'react' // tslint:disable-line:no-unused-variable
import { render } from 'react-dom'
import { createStore } from 'redux'
import { Provider, connect } from 'react-redux'
import App from 'components/App'

declare var module: { hot: any }
declare var window: { devToolsExtension: any }

// ルート要素
const rootEl = document.getElementById('root');

import { compose, applyMiddleware } from 'redux';

import thunk from 'redux-thunk';

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

// ストア
const store = createStore(
  reducer,
  compose(
    applyMiddleware(thunk),
    applyMiddleware(sagaMiddleware),
    devToolsExtension()
  )
);

sagaMiddleware.run(rootSaga);

render(
  <Provider store={store}>
    <App />
  </Provider>,
  rootEl
)

// HMR

if (module.hot) {
  module.hot.accept('./components/App', function () {
    let NextApp = require('./components/App').default
    render(
      <Provider store={store}>
        <NextApp />
      </Provider>,
      rootEl
    )
  })
}
