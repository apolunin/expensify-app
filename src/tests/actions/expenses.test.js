import {
  addExpense,
  editExpense,
  removeExpense
} from '../../actions/expenses';

test('should setup remove expense action object', () => {
  const action = removeExpense({ id: '123abc' });
  expect(action).toEqual({
    type: 'REMOVE_EXPENSE',
    id: '123abc'
  })
});

test('should setup edit expense action object', () => {
  const id = '123abc';
  const updates = {
    note: 'Updated Note',
    amount: 123,
    description: 'Updated Description'
  };

  const action = editExpense(id, updates);

  expect(action).toEqual({
    type: 'EDIT_EXPENSE',
    id,
    updates
  });
});

test('should setup add expense action object with provided values', () => {
  const expense = {
    description: 'Rent',
    amount: 190500,
    createdAt: 1000,
    note: 'This is last month rent'
  }

  const action = addExpense(expense);

  expect(action).toEqual({
    type: 'ADD_EXPENSE',
    expense: {
      id: expect.any(String),
      ...expense
    }
  });
});

test('should setup add expense action object with default values', () => {
  const action = addExpense();

  expect(action).toEqual({
    type: 'ADD_EXPENSE',
    expense: {
      id: expect.any(String),
      description: '',
      amount: 0,
      createdAt: 0,
      note: ''
    }
  });
});