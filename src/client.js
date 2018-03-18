import React from 'react'
import ReactDOM from 'react-dom'
import { AppContainer } from 'react-hot-loader'
import { createStore, combineReducers, compose } from 'redux'
import { Provider } from 'react-redux'
import { Router, Route } from 'react-router'
import { syncHistoryWithStore, routerReducer } from 'react-router-redux'
import { createBrowserHistory } from 'history'

import App from './containers/App'
import * as reducers from './reducers'

const enhancer = compose(__DEVTOOLS__ && window.devToolsExtension ? window.devToolsExtension() : f => f)

const store = createStore(
  combineReducers({
    ...reducers,
    routing: routerReducer
  }),
  enhancer
)

const history = syncHistoryWithStore(createBrowserHistory(), store)

const mountNode = document.getElementById('root')

const renderApp = Component => {
  ReactDOM.render(
    <AppContainer>
      <Provider store={store}>
        <Router history={history}>
          <Route path='/' component={Component} />
        </Router>
      </Provider>
    </AppContainer>,
    mountNode
  )
}

renderApp(App)

if (module.hot) {
  module.hot.accept('./containers/App', () => {
    renderApp(App)
  })
}
