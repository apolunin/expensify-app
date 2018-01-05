import { createStore } from 'redux';

const incrementCount = ({ incrementBy = 1 } = {}) => ({
  type: 'INCREMENT',
  incrementBy
});

const decrementCount = ({ decrementBy = 1 } = {}) => ({
  type: 'DECREMENT',
  decrementBy
});

const setCount = ({ count }) => ({
  type: 'SET',
  count
});

const resetCount = () => ({
  type: 'RESET'
});

const countReducer = (state = { count: 0 }, action) => {
  let newState = state;

  switch (action.type) {
    case 'INCREMENT':
      newState = {
        count: state.count + action.incrementBy
      };
      break;
    case 'DECREMENT':
      newState = {
        count: state.count - action.decrementBy
      }
      break;
    case 'SET':
      newState = {
        count: action.count
      };
      break;
    case 'RESET':
      newState = {
        count: 0
      }
      break;
  }

  return newState;
}

const store = createStore(countReducer);

store.subscribe(() => {
  console.log(store.getState());
});

store.dispatch(incrementCount({ incrementBy: 5 }));
store.dispatch(incrementCount());

store.dispatch(resetCount());

store.dispatch(decrementCount({ decrementBy: 10 }));
store.dispatch(setCount({ count: 101 }));