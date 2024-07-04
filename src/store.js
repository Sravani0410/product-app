import { createStore, applyMiddleware } from 'redux';
// import { composeWithDevTools } from 'redux-devtools-extension'; // Ensure you import composeWithDevTools
import {thunk} from 'redux-thunk';
import rootReducer from './reducers';

const store = createStore(
  rootReducer,
  // composeWithDevTools(applyMiddleware(thunk))
  applyMiddleware(thunk)
);

export default store;
