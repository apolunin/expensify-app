import React from 'react';
import { shallow } from 'enzyme';
import { ExpensesSummary } from '../../components/ExpensesSummary';
import expensesTotal from '../../selectors/expenses-total';

test('should render ExpensesSummary with a single expense', () => {
  const wrapper = shallow(
    <ExpensesSummary
      expenseCount={1}
      expensesTotal={15000} />
  );
  expect(wrapper).toMatchSnapshot();
});

test('should render ExpensesSummary with multiple expenses', () => {
  const wrapper = shallow(
    <ExpensesSummary
      expenseCount={2}
      expensesTotal={30000} />
  );
  expect(wrapper).toMatchSnapshot();
});