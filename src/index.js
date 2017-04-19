import React from 'react'
import { render } from 'react-dom';
import { Provider } from 'react-redux'
// import { Router, hashHistory } from 'react-router'
import { Router, browserHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'

import { LocaleProvider } from 'antd'
import enUS from 'antd/lib/locale-provider/en_US'

import routes from './routes'
import configureStore from './store/configureStore'

const store = configureStore()

// const history = syncHistoryWithStore(hashHistory, store)
const history = syncHistoryWithStore(browserHistory, store)
history.listen(location => {    
  setTimeout(() => {
    if (location.action === 'POP') {
      return
    }
    window.scrollTo(0, 0)
  })
})
render(
    <LocaleProvider locale={enUS}>
        <Provider store={store}>
            <Router history={history} routes={routes} />
        </Provider>
    </LocaleProvider>,
    document.getElementById('root')
)
