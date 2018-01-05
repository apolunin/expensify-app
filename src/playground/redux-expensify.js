import { createStore, combineReducers } from 'redux';
import uuid from 'uuid';

// ADD_EXPENSE
const addExpense = ({
  description = '',
  note = '',
  amount = 0,
  createdAt
}) => ({
    type: 'ADD_EXPENSE',
    expense: {
      id: uuid(),
      description,
      note,
      amount,
      createdAt
    }
  });

// REMOVE_EXPENSE
const removeExpense = ({ id }) => ({
  type: 'REMOVE_EXPENSE',
  id
});

// EDIT_EXPENSE
const editExpense = (id, updates) => ({
  type: 'EDIT_EXPENSE',
  id,
  updates
});

// SET_TEXT_FILTER
const setTextFilter = (text = '') => ({
  type: 'SET_TEXT_FILTER',
  text
});

// SORT_BY_AMOUNT
const sortByAmount = () => ({
  type: 'SORT_BY_AMOUNT',
  sortBy: 'amount'
});

// SORT_BY_DATE
const sortByDate = () => ({
  type: 'SORT_BY_DATE',
  sortBy: 'date'
});

// SET_START_DATE
const setStartDate = (startDate = null) => ({
  type: 'SET_START_DATE',
  startDate
});

// SET_END_DATE
const setEndDate = (endDate = null) => ({
  type: 'SET_END_DATE',
  endDate
});

const expensesReducer = (state = [], action) => {
  let newState = state;

  switch (action.type) {
    case 'ADD_EXPENSE':
      newState = [...state, action.expense];
      break;
    case 'REMOVE_EXPENSE':
      newState = state.filter(({ id }) => id !== action.id);
      break;
    case 'EDIT_EXPENSE':
      newState = state.map(expense =>
        (expense.id !== action.id) ?
          {
            ...expense,
            ...action.updates
          } :
          expense);
      break;
  }

  return newState;
}

const filtersReducer = (
  state = {
    text: '',
    sortBy: 'date',
    startDate: null,
    endDate: null
  }, action) => {

  let newState = state;

  switch (action.type) {
    case 'SET_TEXT_FILTER':
      newState = {
        ...state,
        text: action.text
      };
      break;
    case 'SORT_BY_AMOUNT':
    case 'SORT_BY_DATE':
      newState = {
        ...state,
        sortBy: action.sortBy
      };
      break;
    case 'SET_START_DATE':
      newState = {
        ...state,
        startDate: action.startDate
      };
      break;
    case 'SET_END_DATE':
      newState = {
        ...state,
        endDate: action.endDate
      }
      break;
  }

  return newState;
}

const filterExpenses = (expenses, {
  text,
  sortBy,
  startDate,
  endDate
}) => expenses.filter(expense => {
    const startDateMatch = typeof startDate !== 'number' || 
      expense.createdAt >= startDate;

    const endDateMatch = typeof endDate !== 'number' || 
      expense.createdAt <= endDate;

    const textMatch = typeof text !== 'string' ||
      expense.description.toLocaleLowerCase().includes(text.toLocaleLowerCase());

    return startDateMatch && endDateMatch && textMatch;
  }).sort((a, b) => {
    let result = 0;

    switch (sortBy) {
      case 'date':
        result = a.createdAt > b.createdAt ? -1 : 1;
        break;
      case 'amount':
        result = a.amount > b.amount ? -1 : 1;
        break;
    }

    return result;
  });

const store = createStore(
  combineReducers({
    expenses: expensesReducer,
    filters: filtersReducer
  })
);

store.subscribe(() => {
  const { expenses, filters } = store.getState();
  const filteredExpenses = filterExpenses(expenses, filters);
  console.log(filteredExpenses);
});

const expenseOne = store.dispatch(addExpense({
  description: 'Rent',
  amount: 100,
  createdAt: 1000
}));

const expenseTwo = store.dispatch(addExpense({
  description: 'Coffee',
  amount: 300,
  createdAt: -1000
}));

// console.log(expenseOne);

// store.dispatch(removeExpense({
//   id: expenseOne.expense.id
// }));

// store.dispatch(editExpense(expenseTwo.id, { amount: 500 }));
// store.dispatch(setTextFilter('coffee'));
// store.dispatch(setTextFilter());
// store.dispatch(sortByAmount());
// store.dispatch(sortByDate());

// store.dispatch(setStartDate(0));
// store.dispatch(setStartDate());
// store.dispatch(setEndDate(999));
// store.dispatch(setEndDate());