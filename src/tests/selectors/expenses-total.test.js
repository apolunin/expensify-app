import selectExpensesTotal from '../../selectors/expenses-total';
import expenses from '../fixtures/expenses';

test('should return 0 if no expenses', () => {
  const sum = selectExpensesTotal([]);
  expect(sum).toEqual(0);
});

test('should correctly add up a single expense', () => {
  const sum = selectExpensesTotal([expenses[0]]);
  expect(sum).toEqual(195);
});

test('should correctly add up multiple expenses', () => {
  const sum = selectExpensesTotal(expenses);
  expect(sum).toEqual(114195);
});
