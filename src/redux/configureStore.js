import { createStore, compose, applyMiddleware } from "redux";
import saga from "redux-saga";

import reducers from "./reducers";
import sagas from "./sagas";

const sagaMiddleware = saga();

export default history => {
  const middlewares = [sagaMiddleware];
  const enhancers = compose(applyMiddleware(...middlewares));

  const store = createStore(reducers, enhancers);

  sagaMiddleware.run(sagas);

  return store;
};
