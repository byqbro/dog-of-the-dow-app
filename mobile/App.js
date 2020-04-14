import React, { Component } from 'react';
import AppNavigator from './src/navigation/AppNavigator';
import NavigationService from './src/services/NavigationService';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import RootReducer from './src/store/reducers'
import ReduxThunk from 'redux-thunk';

class App extends Component {
  render() {
    const store = createStore(RootReducer, {}, applyMiddleware(ReduxThunk));
    return (
      <Provider store={store}>
        <AppNavigator ref={navigatorRef => NavigationService.init(navigatorRef)} />
      </Provider>
    );
  }
}

export default App;
