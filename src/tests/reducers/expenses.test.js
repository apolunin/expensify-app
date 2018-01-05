import moment from 'moment';

import expensesReducer from '../../reducers/expenses';
import expenses from '../fixtures/expenses';

test('should set default state', () => {
  const state = expensesReducer(undefined, { type: '@@INIT' });
  expect(state).toEqual([]);
});

test('should remove an expense by id', () => {
  const action = {
    type: 'REMOVE_EXPENSE',
    id: expenses[1].id
  };

  const state = expensesReducer(expenses, action);
  expect(state).toEqual([expenses[0], expenses[2]]);
});

test('should not remove an expense if id is not found', () => {
  const action = {
    type: 'REMOVE_EXPENSE',
    id: '-1'
  };

  const state = expensesReducer(expenses, action);
  expect(state).toEqual(expenses);
});

test('should add an expense', () => {
  const action = {
    type: 'ADD_EXPENSE',
    expense: {
      id: 4,
      description: 'New Description',
      note: 'New Note',
      amount: 50000,
      createdAt: moment(0).add(3, 'days').valueOf()
    }
  };

  const state = expensesReducer(expenses, action);
  expect(state).toEqual([...expenses, action.expense]);
});

test('should edit an expense', () => {
  const action = {
    type: 'EDIT_EXPENSE',
    id: expenses[1].id,
    updates: {
      description: 'Modified Description',
      note: 'Modified Note',
      amount: 40000
    }
  };

  const state = expensesReducer(expenses, action);
  expect(state).toEqual([
    expenses[0],
    {
      ...expenses[1],
      ...action.updates
    },
    expenses[2]
  ]);
});

test('should not edit an expense if expense is not found', () => {
  const updates = {
    description: 'Modified Description',
    note: 'Modified Note',
    amount: 40000
  };

  const action = {
    type: 'EDIT_EXPENSE',
    id: '-1',
    updates
  };

  const state = expensesReducer(expenses, action);
  expect(state).toEqual(expenses);
});