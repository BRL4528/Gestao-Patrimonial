import { createStore, compose, applyMiddleware } from 'redux';

export default (reducers, middlewares) => {
  const enhancer = compose(
    console.tron.createEnhancer(),
    applyMiddleware(...middlewares)
  );

  return createStore(reducers, enhancer);
};
